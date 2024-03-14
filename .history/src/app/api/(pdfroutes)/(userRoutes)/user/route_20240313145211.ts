import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
   try {
    const body : req.json();
    return NextResponse.json()
   } catch (error) {
    
   }
}