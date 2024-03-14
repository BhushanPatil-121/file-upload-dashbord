import NextAuth from "next-auth"

declare module "next-auth" {

  interface user {
    
  }
  interface Session {
    user: {
      address: string
    }
  }
}