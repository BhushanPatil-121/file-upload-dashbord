
"use client"
import DataTable from '@/components/data-table-components/data-Table'
import { Button } from '@/components/ui/button'
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';


type PdfTable = {
  id: number
  fileName: string
  category: "PDF" | "WORK" | "STUDY" | "NOTES" | "SELF"
  fileSize: string
  pdf: string
  uploadedAt: Date
}





export default function PdfList() {
  const [allPdfList, setAllPdfList] = useState<PdfTable[]>([])
  const [pdfFile, setPdfFile] = useState<Blob | undefined>()
  const [p, setP] = useState<string>()

  // const base64toBlob = (data: string) => {
  //   // Cut the prefix `data:application/pdf;base64` from the raw base 64
  //   const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

  //   const bytes = atob(base64WithoutPrefix);
  //   let length = bytes.length;
  //   let out = new Uint8Array(length);

  //   while (length--) {
  //     out[length] = bytes.charCodeAt(length);
  //   }

  //   return new Blob([out], { type: 'application/pdf' });
  // };

  const openPdf = async (pdf: string) => {
    // const blob = base64toBlob(pdf);
    // const url = URL.createObjectURL(blob);
    console.log(pdf);

    // setP(pdf)
    // fetch(pdf)
    //   .then(res => res.blob())
    //   .then(set => setPdfFile(set))
  }

  useEffect(() => {
    const getData = async () => {
      try {
        let data: any = await fetch("http://localhost:3000/api/pdflist", { cache: "no-cache" });
        data = await data.json()
        setAllPdfList(data.fileList)
        console.log(data);
      } catch (error) {
        console.log("error");
      }
    }

    getData();



  }, [])


  const columns: ColumnDef<PdfTable>[] = [

    {
      accessorKey: "fileName",
      header: "File Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "fileSize",
      header: "File Size",
      cell: ({ row }) => {
        const amount = row.getValue("fileSize")
        const formatted = amount + " MB"

        return <div className="text-left ">{formatted}</div>
      },
    },
    {
      accessorKey: "uploadedAt",
      header: "Upload Date",
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        const id: number = parseInt(row.getValue("id"))
        const file = allPdfList.filter((row) => row.id === id);
        const pdf = file[0].pdf;

        return <div className="text-left ">
          <div className="flex justify-start items-center gap-1 p-0  max-w-32">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" onClick={() => openPdf(pdf)}>Open</Button>
              </SheetTrigger>
              <SheetContent className="w-[350px] sm:w-2/3 sm:max-w-none p-10">

                {/* style={{zIndex:"100", width: '100%', height: '650px' , overflowY:"scroll", paddingTop:"10px"}} */}
                <div className='w-full  h-full overflow-y-scroll '>
                  {/* Use iframe to display the PDF */}
                  <iframe
                    title="PDF Viewer"
                    src={pdf}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <Button onClick={() => deleteFile(id)}>Delete</Button>
            <Button onClick={() => open(id)}>Open</Button>
          </div>
        </div>
      },
    },
  ]

  const open = (id: number) => {
    alert(`${id}`)
  }
  const deleteFile = async (id: number) => {
    try {
      let data = await toast.promise(
        fetch(`/api/deletepdf/${id}`, {
          method: "DELETE",
        }),
        {
          pending: 'Deleting File ...',
        }
      );
      const result = await data.json();
      if (result.success) {
        setAllPdfList(allPdfList.filter((pdf) => pdf.id !== id))
        toast.success("File Deleted")
      } else {
        toast.error("Fail To Delete")
      }
    } catch (error) {
      toast.error("Server Error")
    }
  }

  return (
    <div className='  flex  flex-col items-center justify-between  min-w-full mt-14 '>
      <div className='  w-11/12 h-96 '>
        <div className="container mx-auto py-10">
          <DataTable columns={columns}
            data={allPdfList}
            
          />
        </div>
      </div>
    </div>
  )
}
