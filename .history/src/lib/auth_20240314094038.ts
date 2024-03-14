import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
export const authOptions: NextAuthOptions = {
  //using prisma adapter for database authentication
  adapter: PrismaAdapter(prisma),
  //jwt token authentication
  session:{
    strategy:"jwt"
  },
  //default login page to custom login page
  pages:{
    signIn:'/sign-in',
    signOut:'/sign-in'
  },
  // using credentials authentication by provider
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //if user email and password is null then return nothing
        if(!credentials?.email || !credentials?.password){
          return null;
        }

        const existing
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
};
