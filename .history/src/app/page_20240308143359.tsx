"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { calculateFileSizeInMb } from "@/utils/calculateFileSizeInMb";
import { pdfToBlob } from "@/utils/pdfToBlob";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  const [fileName, setFileName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<string | ArrayBuffer | null>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [showMissingFieldError, setShowMissingFieldError] =
    useState<boolean>(false);
  const handleSubmit = () => {
    clearField();
    if (fileName.length > 0 && category.length > 0 && date) {
      setShowMissingFieldError(false);
      console.log(fileName, fileSize, category, date);
    } else {
      setShowMissingFieldError(true);
    }
  };
  const clearField = () => {
    setFile("");
    setCategory("");
    setFileSize("");
    setFileName("");
  };
  const inputFile = useRef<any>();
  const handleDrop = async (event: any) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length > 0) {
      var file = files[0];
      if (file.type !== "application/pdf")
        return alert("Please select PDF File only");

      const dataBlob = await pdfToBlob(file);
      let size = calculateFileSizeInMb(dataBlob.size);
      setFileSize(size);
      //converting blob data into dataURL
      const f = new File([dataBlob], file.name, { type: dataBlob.type });
      const fr = new FileReader();
      fr.readAsDataURL(f);
      fr.onload = () => {
        const re = fr.result;
        setFile(re);
      };
      // able to select same file
      event.target.value = "";
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      // storing file blob data
      const dataBlob = await pdfToBlob(file);
      let size = calculateFileSizeInMb(dataBlob.size);
      setFileSize(size);
      //converting blob data into dataURL
      const f = new File([dataBlob], file.name, { type: dataBlob.type });
      const fr = new FileReader();
      fr.readAsDataURL(f);
      fr.onload = () => {
        const re = fr.result;
        setFile(re);
      };
      // able to select same file
      e.target.value = "";
    }
  };
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between  min-w-full"
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen min-w-full">
        {file ? (
          
          <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen min-w-full gap-10">
            <h2 className="text-center text-4xl font-extrabold relative after:absolute after:-bottom-5 after:h-1 after:w-1/2 after:bg-gray-400 after:left-0 after:right-0 after:mx-auto after:rounded-full">
              Effortless PDF Upload
            </h2>

            <h2 className="text-2xl text-center font-normal  p-0.5 leading-7">
              Seamlessly Store Your Documents in Database
            </h2>
            <div className=" text-center px-4 rounded w-2/3 flex flex-col items-center justify-center cursor-pointer mx-auto font-[sans-serif]">
              <div className="py-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 mb-2 fill-gray-600 inline-block"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                <h4 className="text-base font-semibold text-gray-600">
                  Drag and drop files here
                </h4>
              </div>
              <hr className="w-full border-gray-400 my-2" />
              <div className="py-6">
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="application/pdf"
                />
                <label
                  htmlFor="file"
                  className="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold border-none outline-none bg-gray-200 hover:bg-gray-100"
                >
                  Browse Files
                </label>
                <p className="text-xs text-gray-400 mt-4">
                  PDF File is Allowed.
                </p>
              </div>
            </div>
          </div>
          //   <CardTitle className="flex flex-col items-center justify-center text-center font-black p-15">
          //     Effortless PDF Upload: Seamlessly Store Your Documents in
          //     Database
          //   </CardTitle>
          //   <CardTitle className="flex flex-col items-center justify-center text-center font-normal p-15">
          //     Upload File Or Darg And Drop Here
          //   </CardTitle>
          //   <Button
          //     className="flex flex-row items-center justify-center gap-2 font-bold"
          //     variant={"outline"}
          //     onClick={() => {
          //       // `current` points to the mounted file input element
          //       inputFile.current.click();
          //     }}
          //   >
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       fill="none"
          //       viewBox="0 0 24 24"
          //       strokeWidth={1.5}
          //       stroke="currentColor"
          //       className="w-6 h-6"
          //     >
          //       <path
          //         strokeLinecap="round"
          //         strokeLinejoin="round"
          //         d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
          //       />
          //     </svg>
          //     Upload file
          //   </Button>
          //   <input className="hidden"
          //     type="file"
          //     onChange={handleFileChange}
          //     id="file"
          //     accept="application/pdf"
          //     ref={inputFile}
          //   />
          // </Card>
        )}
      </div>
    </main>
  );
}
