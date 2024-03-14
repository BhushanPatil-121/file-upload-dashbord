import NextAuth from "next-auth"

declare module "next-auth" {

    int
  interface Session {
    user: {
      address: string
    }
  }
}