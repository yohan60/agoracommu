import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    roles: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    roles: string;
  }
}