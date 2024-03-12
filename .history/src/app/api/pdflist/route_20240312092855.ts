import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


//get all fileName list to display on UI 
export async function GET(){
    try {
        const fileList = await prisma.pdfTable.findMany({
            orderBy:[
                {
                    id : 'asc'
                }
            ]
        });
        
        return NextResponse.json({success: true, fileList , status:"200"}, {status: 200});
    } catch (error) {
        console.log("SERVER ERROR ");
        
        return NextResponse.json({success: false , status:"409"}, {status: 409});
    }
}
