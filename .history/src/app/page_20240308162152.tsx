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
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { calculateFileSizeInMb } from "@/utils/calculateFileSizeInMb";
import { pdfToBlob } from "@/utils/pdfToBlob";

export default function Home() {
  const [fileName, setFileName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<string | ArrayBuffer | null>("");
  const [fileSize, setFileSize] = useState<string>("");
  const [showMissingFieldError, setShowMissingFieldError] =
    useState<boolean>(false);

  const handleSubmit = async () => {
    if (fileName.length > 0 && category.length > 0 && date) {
      setShowMissingFieldError(false);
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("fileSize", fileSize);
      formData.append("category", category);
      formData.append("file", file as unknown as string);
      formData.append("uploadDate", new Date(date));

      try {
        const body = await toast.promise(
          fetch("/api/addpdf1", {
            method: "POST",
            body: formData,
          }),
          {
            pending: 'Uploading File ...',
            // success: 'Promise resolved 👌',
            // error: 'Promise rejected 🤯'
          }
      );

        const result = await body.json();

        //if result is success
        if (result.status === "200") {
          // setRequestData(new Date());
          toast.success("PDF uploaded successfully");
        }
        //if result fail due to file name unique in database
        else if (result.status === "409") {
          toast.warning("File Name Already Exists");
        }
        // if result fails due to input field is missing
        else if (result.status === "401") {
          toast.warning("Please Select Different File");
        } else {
          toast.error("Fail To Upload PDF");
        }
      } catch (error) {
        // catch all error
        toast.error("ERROR! Failed to upload PDF");
      } finally {
        // called function to clear input field
        clearField();
        setFile("");
      }
      console.log(fileName, fileSize, category, date);
    } else {
      clearField();
      setFile("");
      setShowMissingFieldError(true);
    }
  };
  const cancelSubmit = () => {
    clearField();
    setFile("");
  };
  const clearField = () => {
    setShowMissingFieldError(false);
    setCategory("");
    setFileSize("");
    setFileName("");
    setDate(undefined);
  };
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
      <div className="flex flex-col items-center justify-center min-h-screen min-w-full ">
        {file && (
          <div className="absolute z-10  flex flex-col items-center justify-center min-h-screen min-w-full bg-gray-700  bg-opacity-90">
            <Card className="px-5">
              <CardHeader>
                <CardTitle className="text-center">
                  Enter File Details
                </CardTitle>
                <CardDescription className="text-center">
                  Upload your file in database.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="fileName" className="flex flex-row">
                        File Name
                        {!fileName && (
                          <span className="px-1  text-red-500 font-semibold">
                            {showMissingFieldError ? "*required" : "*"}
                          </span>
                        )}
                      </Label>
                      <Input
                        id="fileName"
                        placeholder="Name of your file"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-row space-x-5 ">
                        <div className="flex flex-col space-y-3 w-[180px]">
                          <Label htmlFor="category">
                            File Category
                            {!category && (
                              <span className="px-1  text-red-500 font-semibold">
                                {showMissingFieldError ? "*required" : "*"}
                              </span>
                            )}
                          </Label>
                          <Select
                            value={category}
                            onValueChange={(e) => setCategory(e)}
                          >
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
                        <div className="flex flex-col space-y-3 w-[80px]">
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
                      <Label htmlFor="name">
                        Select Date
                        {!date && (
                          <span className="px-1  text-red-500 font-semibold">
                            {showMissingFieldError ? "*required" : "*"}
                          </span>
                        )}
                      </Label>
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
                <Button variant="outline" onClick={cancelSubmit}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Upload</Button>
              </CardFooter>
            </Card>
          </div>
        )}
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
              <p className="text-xs text-gray-400 mt-4">PDF File is Allowed.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
