import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request, con:any){
    try {
        let email=con.params.profile;
        console.log(email)
        const file= await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        
        // const avatar = file.avtar;
        return NextResponse.json({success: true,   status:"200"}, {status: 200});
    } catch (error) {
        console.log("SERVER ERROR GET FILE ", error);
        
        return NextResponse.json({success: false , status:"409"}, {status: 409});
    }
}