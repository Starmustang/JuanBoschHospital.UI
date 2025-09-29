import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      role?: string | string[];
      roles?: string[];
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role?: string | string[];
    roles?: string[];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string | string[];
    roles?: string[];
  }
}
