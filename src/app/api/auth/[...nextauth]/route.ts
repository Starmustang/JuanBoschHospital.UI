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

          const response = await fetch("http://localhost:5028/api/Account/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          if (data.token) {
            const decodedToken: any = jwtDecode(data.token);
            return {
              id: decodedToken.nameid,
              email: decodedToken.unique_name,
              name: decodedToken.unique_name, // Or another field from the token if available
              role: decodedToken.role, // Make sure 'role' is in your token
              accessToken: data.token,
            };
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.role = token.role;
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
  },
});

export { handler as GET, handler as POST };
