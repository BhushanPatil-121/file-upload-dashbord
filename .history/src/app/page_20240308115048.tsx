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

export default function Home() {
  const [fileName, setFileName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<string | ArrayBuffer | null>("");
  const [fileSize, setFileSize] = useState<string>("");

  const handleSubmit = () => {
    clearField();
    console.log(fileName, fileSize, category, date);
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
      <Card className="flex flex-col items-center justify-center min-h-screen min-w-full">
        {file ? (
          <Card>
            <CardHeader>
              <CardTitle>Upload Your File</CardTitle>
              <CardDescription>Upload your file in database.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="fileName">File Name</Label>
                    <Input
                      id="fileName"
                      placeholder="Name of your project"
                      onChange={(e) => setFileName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-row space-x-5 ">
                      <div className="flex flex-col space-y-3 w-[150px]">
                        <Label htmlFor="category">File Category</Label>
                        <Select onValueChange={(e) => setCategory(e)}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="PDF">PDF</SelectItem>
                            <SelectItem value="WORK">WORK</SelectItem>
                            <SelectItem value="STUDY">STUDY</SelectItem>
                            <SelectItem value="NOTES">NOTES</SelectItem>
                            <SelectItem value="SELF">SELF</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col space-y-3 w-[130px]">
                        <Label htmlFor="fileSize">File Size</Label>
                        <Input
                          id="fileSize"
                          disabled
                          value={`${fileSize} MB`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="name">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setFile("")}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Upload</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-evenly border-hidden gap-5">
            <CardTitle className="flex flex-col items-center justify-center m-5">
              Effortless PDF Upload: Seamlessly Store Your Documents in Our
              Database
            </CardTitle>
            <CardTitle className="flex flex-col items-center justify-center">
              Upload File
            </CardTitle>
            <Button
              className="flex flex-row items-center justify-center gap-2"
              variant={"outline"}
              onClick={() => {
                // `current` points to the mounted file input element
                inputFile.current.click();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                />
              </svg>
              Upload file
            </Button>
            <input className="disabled" 
              type="file"
              onChange={handleFileChange}
              id="file"
              accept="application/pdf"
              ref={inputFile}
            />
          </Card>
        )}
      </Card>
    </main>
  );
}
