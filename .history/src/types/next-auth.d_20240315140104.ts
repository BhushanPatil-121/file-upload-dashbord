import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name:string
    avatar: string | null;
    role: UserRole;
  }
  interface Session {
    user: User & {
      avatar: string | null;
      role: UserRole;
    };
    token: {
      avatar: string | null;
      role: UserRole;
    };
  }
}
