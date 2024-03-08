import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function DELETE(req:Request, con:any){
    try {
        let id=parseInt(con.params.pdf);
        console.log("Server FIle NAme" ,id);
        
        const file= await prisma.pdfTable.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({success: true, file , status:"200"}, {status: 200});
    } catch (error) {
        console.log("Error : Delete file : " + error);
        
        return NextResponse.json({success: false , status:"409"}, {status: 409});
    }
}