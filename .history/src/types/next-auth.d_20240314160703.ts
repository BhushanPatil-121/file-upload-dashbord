import NextAuth from "next-auth"

declare module "next-auth" {

  interface user {
    id:string,
    name:string,
    email:string,
    avatar:string,
    role:
  }
  interface Session {
    user: {
      address: string
    }
  }
}