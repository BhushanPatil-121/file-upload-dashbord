import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashpassword = await hash(password,10)
    const newUser = await prisma.user.create({
        data:{
            name,
            email,
            password:hashpassword
        }
    })
    const { password:newUserPassword, ...user}= newUser;
    return NextResponse.json({user:newUser , message:"User Created Successfully"},{status:201});
  } catch (error) {
    console.log("SERVER ERROR POST USER ", error);
    return NextResponse.json({user:null , message:"Server Error"},{status:500});
  }
}
