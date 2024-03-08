import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


//store filename and fileData in base64 url
export async function POST(req: Request){
    
    try {
        const body=await req.formData();
        const fileName : any= body.get('fileName')+"";
        const file:any = body.get('file')+"";
        const category:any = body.get('category')+"";
        const fileSize:any = body.get('fileSize')+"";
        const uploadDate:any = body.get('uploadDate')+"";
        
        if(file === "null" && fileName === "null" ){
            return NextResponse.json({success: false, message: "Please Select Different File",status: "401"},{status: 401})
        }
        //check file name already exist or not
        const existingFileName = await prisma.pdfTable.findUnique({
            where: { fileName: fileName}
        });
        if(existingFileName){
            return NextResponse.json({success: false, message: "File Name already exists",status: "409"},{status: 409})
        }
        const pdfUpload = { Done: true}
        // const pdfUpload = await prisma.pdfTable.create({
        //     data: {
        //         fileName: fileName,
        //         pdf: file,
        //         category:category,
        //         fileSize: fileSize,
        //         uploadDate: uploadDate
        //     }
        // })
        console.log(fileName, file.slice(2), category, fileSize, uploadDate);
        
        
        return NextResponse.json({success: true, pdfUpload, status: "200"},{status: 200});
    } catch (error) {
        // console.log("SERVER CATCH ERROR ", error)
        return NextResponse.json({success: false, error: error , status: "400"},{status: 400})
    }
}   