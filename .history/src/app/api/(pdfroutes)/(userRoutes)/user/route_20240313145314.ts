import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
   try {
    const body = await req.json();
    const { email ,password, }
    return NextResponse.json(body)
   } catch (error) {
    
   }
}