import prisma from "@/lib/prisma";
import { log } from "console";
import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
    try{
        const img=await req.json();
        console.log(img)
        const updateUserProfile = await prisma.user.update({
            where: {
                id: 1,
              },
            data:{
                ava
            }
        })
        return NextResponse.json({status:"success"})
    }catch{
        return NextResponse.json({status:"fail"})
    }
}