"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import { categoryList } from "@/utils/categoryList";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { DateRangePicker } from 'react-date-range';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { format } from "date-fns";
import swal from "sweetalert";
import moment from "moment";
import { useTheme } from "next-themes";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, ResetIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { DownloadIcon, SearchCheckIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
const styles = {
  lightHover: {
    color: "black",
    fontWeight: "500",
    fontFamily: "var(--font-sans)",
    letterSpacing: "1px",
    borderColor: "inherit",
    "&:hover": {
      backgroundColor: "#f8fafc",
    },
  },
  darkHover: {
    color: "white",
    fontWeight: "500",
    fontFamily: "var(--font-sans)",
    letterSpacing: "1px",
    borderColor: "inherit",
    "&:hover": {
      backgroundColor: "#101929",
    },
  },
  lightTableHead: { color: "white" },
  tableRow: {
    textTransform: "uppercase",
    color: "grey",
    fontFamily: "var(--font-sans)",
    letterSpacing: "1.5px",
    fontWeight: "700",
    borderBottomWidth: "2px",
    borderColor: "inherit",
    bgcolor: "hsl(var(--background))",
  },
  tableRowFirst: { borderTopLeftRadius: "12px" },
  tableRowLast: { borderTopRightRadius: "12px" },
  th: {
    minWidth: "150px",
  },
  btnFont: {
    fontFamily: "var(--font-sans)",
  },
};

export default function PdfListPage() {
  const [requestData, setRequestData] = useState(new Date());
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(10);
  const [pdfList, setPdfList] = useState<any[]>([]);
  const [allPdfList, setAllPdfList] = useState<any[]>([]);
  const [fileCategory, setFileCategory] = useState<string>("All Files");
  const [pdfUrl, setPdfUrl] = useState("Upload On");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [deleteFileName, setDeleteFileName] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showEditPopUp, setShowEditPopUp] = useState<boolean>(false);
  const [fileNameSortUp, setFileNameSortUp] = useState<boolean>(true);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [categoryFilterValue, setCategoryFilterValue] = useState<string>("");
  const [clearFilter, setClearFilter] = useState(false);
  const [showMissingFieldError, setShowMissingFieldError] =
    useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [editField, setEditField] = useState({
    id: "",
    fileName: "",
    category: "",
    uploadedAt: "",
  });
  const { theme } = useTheme();
  //set page
  const handlechangepage = (event: any, newpage: any) => {
    let a = event;
    pagechange(newpage);
  };

  //set rows to show on table
  const handleRowsPerPage = (event: any) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  //category list with "all file" field
  const allCategorylist = [
    {
      value: "All Files",
    },
    ...categoryList,
  ];

  //get all pdf list present in database and stored in "pdflist"
  // with ascending sorting by default
  useEffect(() => {
    const getAllData = async () => {
      const response = await fetch("/api/pdflist", {
        cache: "no-store",
      });

      const data = await response.json();
      setAllPdfList(data.fileList);
      sortByUpArrow(data.fileList);
    };
    getAllData();
  }, [requestData]);

  // edit file
  const handleEdit = (pdf: any) => {
    let newDate = date;
    setEditField({
      ...editField,
      id: pdf.id,
      fileName: pdf.fileName,
      category: pdf.category,
      uploadedAt: newDate + "",
    });

    setDate(new Date(pdf.uploadedAt));
    setShowEditPopUp(true);
  };

  // handle update api
  const handleEditApi = async () => {
    const formData = new FormData();
    formData.append("id", editField.id);
    formData.append("fileName", editField.fileName);
    formData.append("category", editField.category);
    formData.append("uploadDate", date + "");
    let id = formData.get("uploadDate");

    const data = await toast.promise(
      fetch("/api/updatePdfField", {
        method: "PUT",
        body: formData,
      }),
      {
        pending: "Uploading File ...",
      }
    );
    const result = await data.json();

    if (result.success) {
      toast.success("Updated");

      //after success update rows
      let filteredList = allPdfList;
      filteredList = filteredList.filter((file) => {
        if (file.id == result.fileList.id) {
          file.fileName = result.fileList.fileName;
          file.category = result.fileList.category;
          file.uploadedAt = result.fileList.uploadedAt;
        }
      });
      setShowEditPopUp(false);
    } else {
      toast.error("Error");
      setShowEditPopUp(false);
    }
  };

  // delete pdf (remove pdf from db)
  const handleDelete = async (f: string) => {
    setDeleteFileName(f);
    //sweet alert notification
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }) // user press "delete" then following function run
      .then((willDelete: any) => {
        if (willDelete) {
          const deleteIt = async () => {
            const body = await toast.promise(
              fetch(`/api/deletepdf/${f}`, {
                method: "DELETE",
              }),
              {
                pending: "Deleting File ...",
              }
            );
            const result = await body.json();
            // result ok
            if (result.status === "200") {
              // updated list by removing file
              setPdfList(pdfList.filter((x) => x.fileName !== f));
              swal("Done! Your file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Something went wrong!");
            }
            setRequestData(new Date());
            setDeleteFileName("");
          };
          deleteIt();
        } // when click on "cancel"
      });
  };

  // reset All for change date selection to default
  const resetAll = () => {
    setSearchQuery("");
    sortByUpArrow(allPdfList);
    setFileCategory("All Files");
  };

  // reset date filter
  const clearDateRangeFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    filterPdfList(fileCategory, undefined, undefined, searchQuery);
  };

  // display list by category
  const getByCategory = (categoryName: string) => {
    setClearFilter(true);
    setFileCategory(categoryName);
    filterPdfList(categoryName, startDate, endDate, searchQuery);
  };

  // set pdf list by using search query
  const searchPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setSearchQuery(value.toLowerCase());
    filterPdfList(fileCategory, startDate, endDate, value.toLowerCase());
  };

  // filter function which allowed to filter on multiple condition
  // 1. category filter
  // 2. date range filter
  // 3. filter on search query
  const filterPdfList = (
    category: string,
    start: Date | undefined,
    end: Date | undefined,
    query: string
  ) => {
    let filteredList = allPdfList;
    //only change when category change
    if (category !== "All Files") {
      filteredList = filteredList.filter((file) => file.category === category);
    }
    // filter on current list by changing date range
    if (start && end) {
      filteredList = filteredList.filter((file) => {
        const fileDate = new Date(file.uploadedAt);
        return fileDate >= start && fileDate <= end;
      });
    }

    // filter by search query
    if (query.trim() !== "") {
      filteredList = filteredList.filter((file) =>
        file.fileName.toLowerCase().includes(query)
      );
    }
    sortByUpArrow(filteredList);
  };

  // select date range "used DateRangePicker package"
  const selectionRange: { startDate: any; endDate: any; key: string } = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  //handle date range change
  const handleSelectDateRange = () => {
    if (startDate && endDate) {
      filterPdfList(fileCategory, startDate, endDate, searchQuery);
    } else {
      toast.warning("Please select start and end date");
    }
  };


  //pdf viewer
  const pdfViewer=(pdf:string)=>{
    const blob = base64ToBlob(pdf);
    const url = URL.createObjectURL(blob);
    setUrl
  }

  // set file list in ascending order
  const sortByUpArrow = (data: any) => {
    if (!data) return null;
    const sortedList = [...data].sort((a, b) => {
      const nameA = a.fileName.toUpperCase();
      const nameB = b.fileName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setPdfList(sortedList);
  };

  // set file list on descending order
  const sortByDownArrow = (data: any) => {
    if (!data) return null;
    const sortedList = [...data].sort((a, b) => {
      const nameA = a.fileName.toUpperCase();
      const nameB = b.fileName.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
    setPdfList(sortedList);
  };

  // download pdf
  const downloadPDF = (pdf: string, fileName: string) => {
    // const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    // const fileName = "file.pdf";
    const downloadFileName = fileName + ".pdf";

    downloadLink.href = pdf;
    downloadLink.download = downloadFileName;
    downloadLink.click();
  };

  return (
    <div className="flex flex-col items-center justify-between  min-w-full mt-14 ">
      {showEditPopUp && (
        <div className="absolute z-50 -mt-14 flex min-h-screen flex-col items-center justify-center  min-w-full  w-11/12 h-96  ">
          <div className="flex flex-col items-center justify-center  h-full min-w-full bg-gray-900  bg-opacity-95 ">
            <Card className="px-3 w-[350px] h-[450px]">
              <CardHeader>
                <CardTitle className="text-center">
                  Enter File Details
                </CardTitle>
                <CardDescription className="text-center">
                  Upload your file in database.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form autoComplete="off">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="fileName" className="flex flex-row">
                        File Name
                        {!editField.fileName && (
                          <span className="px-1  text-red-500 font-semibold">
                            {showMissingFieldError ? "*required" : "*"}
                          </span>
                        )}
                      </Label>
                      <Input
                        id="fileName"
                        placeholder="Name of your file"
                        value={editField.fileName}
                        onChange={(e) =>
                          setEditField({
                            ...editField,
                            fileName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="category">
                        File Category
                        {!editField.category && (
                          <span className="px-1  text-red-500 font-semibold">
                            {showMissingFieldError ? "*required" : "*"}
                          </span>
                        )}
                      </Label>
                      <Select
                        value={editField.category}
                        onValueChange={(e) =>
                          setEditField({ ...editField, category: e })
                        }
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
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="name">
                        Select Date
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
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
              <CardFooter className="flex justify-end gap-3">
                <Button
                  variant={"outline"}
                  onClick={() => setShowEditPopUp(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleEditApi()}>Update</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      <div className="  w-11/12 h-96 ">
        <div className="container mx-auto py-4 px-0 ">
          <div className="w-inherit ">
            <div className=" mx-auto pt-4 px-0 flex flex-row justify-items-start gap-1 max-[1275px]:flex-col items-start ">
              <div className="flex flex-row  max-sm:flex-col max-sm:min-w-full">
                <div className="rounded-xl border-[1px] min-w-[350px]  mb-2 max-h-[40px]  flex  justify-start items-center">
                  <div className="flex items-center justify-start min-w-full">
                    <SearchIcon />
                    <InputBase
                      sx={{ ml: 1, flex: 1, color: "inherit", p: 1 }}
                      placeholder="Search File Name"
                      value={searchQuery}
                      inputProps={{ "aria-label": "search google maps" }}
                      onChange={searchPdf}
                    />
                  </div>
                </div>
                <div className="rounded-xl min-w-60 max-h-[40px] mb-2 flex flex-row items-center gap-1">
                  <SwapVertIcon />
                  <div className="min-w-40">
                    <Select
                      value={categoryFilterValue}
                      onValueChange={(e) => {
                        setCategoryFilterValue(e);
                        getByCategory(e);
                      }}
                    >
                      <SelectTrigger
                        id="category"
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:ring-transparent"
                      >
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="All Files">All FILES</SelectItem>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="WORK">WORK</SelectItem>
                        <SelectItem value="STUDY">STUDY</SelectItem>
                        <SelectItem value="NOTES">NOTES</SelectItem>
                        <SelectItem value="SELF">SELF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {clearFilter && (
                    <FilterAltOffIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        getByCategory("All Files");
                        setCategoryFilterValue("All Files");
                        setClearFilter(false);
                      }}
                    />
                  )}
                  {/* <div className="invisible w-full max-sm:visible">
                   <Select
                      // value={categoryFilterValue}
                      // onValueChange={(e) => {
                      //   setCategoryFilterValue(e);
                      //   getByCategory(e);
                      // }}
                    >
                      <SelectTrigger
                        id="category"
                        className="focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:ring-transparent"
                      >
                        <SelectValue placeholder="Date Filter" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="All Files">All FILES</SelectItem>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="WORK">WORK</SelectItem>
                        <SelectItem value="STUDY">STUDY</SelectItem>
                        <SelectItem value="NOTES">NOTES</SelectItem>
                        <SelectItem value="SELF">SELF</SelectItem>
                      </SelectContent>
                    </Select>
                   </div> */}
                </div>
              </div>
              <div className="mb-2 flex flex-row gap-4 items-center justify-center  max-sm:hidden">
                <Label htmlFor="name">Date Filter</Label>
                <div className="max-[560px]:flex-row flex gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " justify-start text-left font-normal min-w-[150px] ",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Start date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " justify-start text-left font-normal  min-w-[150px]",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span>End date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button variant={"outline"} onClick={handleSelectDateRange}>
                    <SearchCheckIcon />
                  </Button>
                  {startDate && endDate && (
                    <Button variant={"outline"} onClick={clearDateRangeFilter}>
                      <ResetIcon />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-xl border-2 ">
              <TableContainer className="max-h-[450px] min-h-[450px] text-inherit ">
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={[styles.tableRow, styles.tableRowFirst, styles.th]}
                      >
                        File
                      </TableCell>
                      {["Category", "Size", "Size", "Edit", "Action"].map(
                        (item, index) => (
                          <TableCell
                            key={index}
                            sx={[styles.tableRow, styles.th]}
                          >
                            {item}
                          </TableCell>
                        )
                      )}
                      <TableCell
                        sx={[styles.tableRow, styles.tableRowLast, styles.th]}
                      >
                        Download
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pdfList.length > 0 ? (
                      pdfList
                        .slice(
                          page * rowperpage,
                          page * rowperpage + rowperpage
                        )
                        .map((pdf, index1) => {
                          return (
                            <TableRow
                              key={index1}
                              sx={
                                theme === "light"
                                  ? styles.lightHover
                                  : styles.darkHover
                              }
                            >
                              <TableCell
                                sx={
                                  theme === "light"
                                    ? styles.lightHover
                                    : styles.darkHover
                                }
                              >
                                {pdf.fileName}
                              </TableCell>
                              <TableCell
                                sx={
                                  theme === "light"
                                    ? styles.lightHover
                                    : styles.darkHover
                                }
                              >
                                <Badge variant="secondary">
                                  {pdf.category}
                                </Badge>
                              </TableCell>
                              <TableCell
                                sx={
                                  theme === "light"
                                    ? styles.lightHover
                                    : styles.darkHover
                                }
                              >
                                {pdf.fileSize} MB
                              </TableCell>
                              <TableCell
                                sx={
                                  theme === "light"
                                    ? styles.lightHover
                                    : styles.darkHover
                                }
                              >
                                {moment(pdf.uploadedAt).format("DD/MM/YYYY")}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "inherit",
                                  borderColor: "inherit",
                                }}
                              >
                                <Button
                                  variant={"outline"}
                                  className="text-blue-400 hover:text-blue-600 font-bold tracking-wide font-sans"
                                  onClick={() => handleEdit(pdf)}
                                >
                                  <EditNoteIcon /> Edit
                                </Button>
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "inherit",
                                  borderColor: "inherit",
                                }}
                              >
                                <div className="gap-4 flex ">
                                  <Sheet>
                                    <SheetTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="text-green-400 hover:text-green-600 font-bold tracking-wide font-sans"
                                        onClick={()=>pdfViewer(pdf.pdf)}
                                      >
                                        <RemoveRedEyeIcon /> View
                                      </Button>
                                    </SheetTrigger>
                                    <SheetContent className="z-[200] w-[350px] sm:w-2/3 sm:max-w-none p-10">
                                      <div className="w-full  h-full overflow-y-scroll ">
                                        <div
                                          style={{
                                            border:
                                              "1px solid rgba(0, 0, 0, 0.3)",
                                            height: "750px",
                                          }}
                                        >
                                          <Viewer fileUrl="/assets/pdf-open-parameters.pdf" />
                                        </div>
                                        {/* <embed
                                          title="PDF Viewer"
                                          src={pdf.pdf}
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        /> */}
                                      </div>
                                    </SheetContent>
                                  </Sheet>
                                  <Button
                                    variant={"outline"}
                                    className="text-red-400 hover:text-red-600 font-bold tracking-wide font-sans"
                                    onClick={() => handleDelete(pdf.id)}
                                  >
                                    <DeleteIcon /> Delete
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "inherit",
                                  borderColor: "inherit",
                                }}
                              >
                                <Button
                                  variant={"outline"}
                                  className="text-blue-400 hover:text-blue-600 font-bold tracking-wide font-sans"
                                  onClick={() =>
                                    downloadPDF(pdf.pdf, pdf.fileName)
                                  }
                                >
                                  <DownloadIcon /> Download
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          sx={{
                            color: "inherit",
                            borderColor: "inherit",
                            textAlign: "center",
                          }}
                        >
                          No Record Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                sx={{
                  borderTopWidth: "2px",
                  borderColor: "inherit",
                  color: "inherit",
                  borderTop: "1ps solid",
                  ontFamily: "var(--font-sans)",
                  maxHeight: "320px",
                }}
                rowsPerPageOptions={[10, 25, 50]}
                rowsPerPage={rowperpage}
                page={page}
                count={pdfList.length}
                component="div"
                onPageChange={handlechangepage}
                onRowsPerPageChange={handleRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
