import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
    const body : req.json();
    return NextResponse.json()
}