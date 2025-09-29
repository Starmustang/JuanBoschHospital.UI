import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginRequest } from "@/app/(DashboardLayout)/types/auth/auth";
import { jwtDecode } from "jwt-decode";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userName: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.userName || !credentials?.password) {
          return null;
        }

        try {
          const loginData: LoginRequest = {
            userName: credentials.userName,
            password: credentials.password
          };

          // Use environment variable, but ensure it ends with /
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5028/api/";
          const normalizedBaseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl : `${apiBaseUrl}/`;
          const loginUrl = `${normalizedBaseUrl}Account/login`;
          
          console.log("NextAuth: Environment check:");
          console.log("NextAuth: NODE_ENV:", process.env.NODE_ENV);
          console.log("NextAuth: NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
          console.log("NextAuth: Attempting login to:", loginUrl);
          console.log("NextAuth: Login data:", { userName: loginData.userName, password: "[HIDDEN]" });
          
          const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(loginData),
          });

          console.log("NextAuth: Response status:", response.status);
          console.log("NextAuth: Response ok:", response.ok);
          console.log("NextAuth: Response headers:", Object.fromEntries(response.headers.entries()));

          if (!response.ok) {
            const errorText = await response.text();
            console.error("NextAuth: Login failed with status:", response.status);
            console.error("NextAuth: Error response:", errorText);
            console.error("NextAuth: Response URL:", response.url);
            return null;
          }

          const data = await response.json();

          if (data.token) {
            const decodedToken: any = jwtDecode(data.token);
            console.log("NextAuth: Decoded token:", decodedToken);

            // Robust role extraction (supports multiple claim names)
            const rawRoleClaim: any = decodedToken.role
              ?? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
              ?? decodedToken.roles;

            const rolesArr: string[] = Array.isArray(rawRoleClaim)
              ? rawRoleClaim
              : rawRoleClaim
                ? [rawRoleClaim]
                : [];

            // Normalize roles to lowercase strings to match UI constants
            const normalizedRoles = rolesArr
              .filter((r) => !!r)
              .map((r) => (typeof r === "string" ? r.toLowerCase() : String(r).toLowerCase()));

            // Robust id/name extraction
            const id = decodedToken.nameid
              || decodedToken.sub
              || decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
              || "";
            const name = decodedToken.unique_name
              || decodedToken.name
              || decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
              || "";
            const email = decodedToken.email || name;

            const user = {
              id,
              email,
              name,
              role: normalizedRoles.length > 1 ? normalizedRoles : normalizedRoles[0] ?? undefined,
              roles: normalizedRoles,
              accessToken: data.token,
            };

            console.log("NextAuth: Roles extracted:", normalizedRoles);
            console.log("NextAuth: Returning user:", { ...user, accessToken: "[HIDDEN]" });
            return user;
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.role = token.role;
        session.user.roles = token.roles;
        session.user.id = token.sub || '';
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/auth1/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  debug: process.env.NODE_ENV === "development",
  logger: {
    error(code, metadata) {
      console.error("NextAuth Error:", code, metadata);
    },
    warn(code) {
      console.warn("NextAuth Warning:", code);
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === "development") {
        console.log("NextAuth Debug:", code, metadata);
      }
    },
  },
});

export { handler as GET, handler as POST };
