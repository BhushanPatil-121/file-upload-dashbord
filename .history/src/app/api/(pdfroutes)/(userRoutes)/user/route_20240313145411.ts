import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
   try {
    const body = await req.json();
    const { username,email ,password, } = body

    // check if email already exists
    const existingUserBy
    return NextResponse.json(body)
   } catch (error) {
    
   }
}