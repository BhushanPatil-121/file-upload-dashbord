import NextAuth from "next-auth"

declare module "next-auth" {

  interface use
  interface Session {
    user: {
      address: string
    }
  }
}