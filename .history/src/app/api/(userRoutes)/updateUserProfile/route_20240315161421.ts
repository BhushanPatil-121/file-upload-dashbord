import prisma from "@/lib/prisma";
import { log } from "console";
import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response){
    try{
        const body=await req.json();
        console.log(img)
        const updateUserProfile = await prisma.user.update({
            where: {
                id: body.email,
              },
            data:{
                avatar:body.img
            }
        })
        return NextResponse.json({ success: true });
    }catch{
        return NextResponse.json({success:false})
    }
}