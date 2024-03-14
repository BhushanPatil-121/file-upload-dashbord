import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { compare } from "bcrypt";
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
    // signOut:'/sign-in'
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

        //checking user email and password exist in database
        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        // if user not found return nothing
        if(!existingUser){
          return null;
        }

        //comparing to user password with database  password
        const passwordMatch = await compare(credentials.email , existingUser.password)

        // if not matches return nothing
        if(!passwordMatch){
          return null
        }

        return {
          //id is in int  , converting to string
          id:`${existingUser.id}`,
          name:existingUser.name,
          email:existingUser.email,
          avatar:existingUser.avatar,
          role:existingUser.role,
        }

      },
    }),
  ],
};
