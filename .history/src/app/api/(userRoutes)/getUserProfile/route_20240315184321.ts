import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request, con:any){
    try {
        let fileName=con.params.pdf;
        const file= await prisma.pdfTable.findUnique({
            where: {
                fileName: fileName
            }
        });
        const {}
        return NextResponse.json({success: true, file , status:"200"}, {status: 200});
    } catch (error) {
        console.log("SERVER ERROR GET FILE ", error);
        
        return NextResponse.json({success: false , status:"409"}, {status: 409});
    }
}