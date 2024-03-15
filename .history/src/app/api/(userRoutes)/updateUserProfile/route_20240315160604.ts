import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
    try{
        const body=await req.json();
        return NextResponse.json({status:"success"})
    }catch{
        return NextResponse.json({status:"fail"})
    }
}