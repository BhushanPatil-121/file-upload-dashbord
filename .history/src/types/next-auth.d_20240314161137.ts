import NextAuth from "next-auth"

declare module "next-auth" {

  interface User {
    avatar:string,
    role:string
  }
  interface Session {
    user:User & {
        avatar:string,
        role:string
    }
    token:{
        avatar:string,
        role:UserRole
    }
  }
}