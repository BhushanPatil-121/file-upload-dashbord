import prisma from "@/lib/prisma";
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

    const newUser = await prisma.user.create({
        data:{
            
        }
    })
    return NextResponse.json(body);
  } catch (error) {}
}
