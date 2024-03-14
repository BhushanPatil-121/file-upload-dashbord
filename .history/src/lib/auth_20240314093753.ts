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
  // using 
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "email@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
};
