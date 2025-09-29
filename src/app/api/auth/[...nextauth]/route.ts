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

          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5028/api/";
          const loginUrl = `${apiBaseUrl}Account/login`;
          
          console.log("NextAuth: Attempting login to:", loginUrl);
          console.log("NextAuth: Login data:", { userName: loginData.userName, password: "[HIDDEN]" });
          
          const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          });

          console.log("NextAuth: Response status:", response.status);
          console.log("NextAuth: Response ok:", response.ok);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("NextAuth: Login failed with status:", response.status);
            console.error("NextAuth: Error response:", errorText);
            return null;
          }

          const data = await response.json();

          if (data.token) {
            const decodedToken: any = jwtDecode(data.token);
            console.log("NextAuth: Decoded token:", decodedToken);
            
            const user = {
              id: decodedToken.nameid,
              email: decodedToken.unique_name,
              name: decodedToken.unique_name,
              role: decodedToken.role,
              roles: Array.isArray(decodedToken.role) ? decodedToken.role : [decodedToken.role],
              accessToken: data.token,
            };
            
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
});

export { handler as GET, handler as POST };
