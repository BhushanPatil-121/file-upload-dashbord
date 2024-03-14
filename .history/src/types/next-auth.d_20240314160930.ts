import NextAuth from "next-auth"

declare module "next-auth" {

  interface User {
    email:string,
    avatar:string,
    role:string
  }
  interface Session {
    user:User & {
        id:string,
        name:string,
        email:string,
        avatar:string,
        role:string
    }
    token:{
        id:string,
        name:string,
        email:string,
        avatar:string,
        role:string
    }
  }
}