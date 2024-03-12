import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req:Request, res:any){
 
   const body = await req.formData();
   const id:any = body.get('id');
   const fileName : any = body.get('fileName');
   const category:any = body.get('category');
   const uploadDate:Date= new Date(body.get('uploadDate')+"");
   try {
      const fileList = await prisma.pdfTable.update({
         where: {
            id: parseInt(id),
          },
          data:{
            fileName:fileName,
            category:category,
            uploadedAt:uploadDate,
          }
      });
      
      return NextResponse.json({success: true ,fileList, status:"200"}, {status: 200});
  } catch (error) {
   console.log(error);
   
      return NextResponse.json({success: false , status:"409"}, {status: 409});
  }
}