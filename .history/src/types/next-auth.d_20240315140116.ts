import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name:string
    avatar: string | null;
    role: UserRole;
  }
  interface Session {
    user: User & {
      name:string
      avatar: string | null;
      role: UserRole;
    };
    token: {
      name:string
      avatar: string | null;
      role: UserRole;
    };
  }
}
