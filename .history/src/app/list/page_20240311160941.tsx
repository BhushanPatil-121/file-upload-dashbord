"use client";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useEffect, useState } from "react";
import { Chip, MenuItem, TextField, ToggleButtonGroup } from "@mui/material";
import { categoryList } from "@/utils/categoryList";
import FilePresentIcon from "@mui/icons-material/FilePresent";
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
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { DateRangePicker } from "../testPage/page";
import { SearchCheckIcon } from "lucide-react";
const styles = {
  lightHover: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "Arial",
    letterSpacing: "1px",
    borderColor: "inherit",
    "&:hover": {
      backgroundColor: "#f8fafc",
    },
  },
  darkHover: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Arial",
    letterSpacing: "1px",
    borderColor: "inherit",
    "&:hover": {
      backgroundColor: "#101929",
    },
  },
  tableRow: {
    textTransform: "uppercase",
    color: "grey",
    fontFamily: "Arial",
    letterSpacing: "1.5px",
    fontWeight: "bolder",
    borderBottomWidth: "2px",
    borderColor: "inherit",
    bgcolor: "hsl(var(--background))",
    // color: "inherit",
  },
  tableRowFirst: { borderTopLeftRadius: "12px" },
  tableRowLast: { borderTopRightRadius: "12px" },
  th: {
    minWidth: "110px",
  },
};

export default function PdfListPage() {
  const [requestData, setRequestData] = useState(new Date());
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(10);
  const [pdfList, setPdfList] = useState<any[]>([]);
  const [allPdfList, setAllPdfList] = useState<any[]>([]);
  const [fileCategory, setFileCategory] = useState<string>("All Files");
  const [uploadOn, setUploadOn] = useState("Upload On");
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
      // console.log(theme.theme);

      const data = await response.json();
      console.log("ALL PDF LIST ", data.fileList);
      setAllPdfList(data.fileList);
      sortByUpArrow(data.fileList);
    };
    getAllData();
  }, [requestData]);

  // edit file
  const handleEdit = (pdf: any) => {
    console.log(new Date(pdf.uploadedAt));
    let newDate = date;
    setEditField({
      ...editField,
      id: pdf.id,
      fileName: pdf.fileName,
      category: pdf.category,
      uploadedAt: newDate + "",
    });
    console.log(editField);

    setDate(new Date(pdf.uploadedAt));
    setShowEditPopUp(true);
  };

  // handle update api
  const handleEditApi = async () => {
    console.log(date);
    const formData = new FormData();
    formData.append("id", editField.id);
    formData.append("fileName", editField.fileName);
    formData.append("category", editField.category);
    formData.append("uploadDate", date + "");
    let id = formData.get("uploadDate");
    // console.log(formData.get("uploadDate"));

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
    console.log(result);

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
            let body = await fetch(`/api/deletepdf/${f}`, {
              method: "DELETE",
            });
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
        else {
          swal("Your file is safe!");
        }
      });
  };

  // reset All for change date selection to default
  const resetAll = () => {
    setSearchQuery("");
    sortByUpArrow(allPdfList);
    setFileCategory("All Files");
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
  const handleSelectDateRange = (date: any) => {
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    filterPdfList(
      fileCategory,
      date.selection.startDate,
      date.selection.endDate,
      searchQuery
    );
  };

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
                      {/* <div className="flex flex-row space-x-5 ">
                                            <div className="flex flex-col space-y-3 w-[180px]"> */}
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
            <div className=" mx-auto pt-4 px-0 flex flex-row justify-items-start gap-2 max-[1215px]:flex-col ">
              <div className="flex flex-row max-[1215px]:w-full max-[650px]:flex-col ">
                <div className="rounded-xl border-[1px] min-w-[350px] mb-2 max-h-[40px] px-3 flex  justify-start items-center">
                  <div className="flex items-center justify-start min-w-60">
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
                </div>
              </div>
              <div className=" mb-2 flex flex-row gap-4 items-center justify-center max-[560px]:flex-col">
                <Label htmlFor="name">Date Filter</Label>
                <div className="max-[560px]:flex-row flex gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " justify-start text-left font-normal min-w-[180px] ",
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
                          " justify-start text-left font-normal  min-w-[180px]",
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
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      if (startDate && endDate) {
                        filterPdfList(
                          fileCategory,
                          startDate,
                          endDate,
                          searchQuery
                        );
                      } else {
                        alert("Please select start and end date");
                      }
                    }}
                  >
                    <SearchCheckIcon />
                  </Button>
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
                      <TableCell sx={[styles.tableRow, styles.th]}>
                        Category
                      </TableCell>
                      <TableCell sx={[styles.tableRow, styles.th]}>
                        Size
                      </TableCell>
                      <TableCell sx={[styles.tableRow, styles.th]}>
                        Date
                      </TableCell>
                      <TableCell sx={[styles.tableRow, styles.th]}>
                        Edit
                      </TableCell>
                      <TableCell sx={[styles.tableRow, styles.th]}>
                        Action
                      </TableCell>
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
                                {pdf.category}
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
                                  className="text-blue-400 hover:text-blue-600 font-bold tracking-wide"
                                  //   sx={{ cursor: "pointer" ,color:"blue"}}
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
                                  <Button
                                    variant={"outline"}
                                    className="text-green-400 hover:text-green-600 font-bold tracking-wide"
                                    //   sx={{ cursor: "pointer" ,color:"blue"}}
                                    onClick={() => handleDelete(pdf.id)}
                                  >
                                    <RemoveRedEyeIcon /> View
                                  </Button>
                                  <Button
                                    variant={"outline"}
                                    className="text-red-400 hover:text-red-600 font-bold tracking-wide"
                                    //   sx={{ cursor: "pointer" ,color:"blue"}}
                                    onClick={() => handleDelete(pdf.id)}
                                  >
                                    <DeleteIcon/> Delete
                                  </Button>

                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
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

    // <div className={styles.pdfListPage}>
    //     <Paper sx={{ width: '90%' }} className={styles.listPaper}>
    //         <div style={{ width: "100%" }}>
    //             <Paper
    //                 className={styles.searchBar}
    //                 component="form"
    //                 sx={{ p: '2px 4px', m: '5px', display: 'flex', alignItems: 'center' }}
    //             >
    //                 <SearchIcon />
    //                 <InputBase
    //                     sx={{ ml: 1, flex: 1 }}
    //                     placeholder="Search File Name"
    //                     value={searchQuery}
    //                     inputProps={{ 'aria-label': 'search google maps' }}
    //                     onChange={searchPdf}
    //                 />

    //             </Paper>
    //         </div>
    //         <TableContainer sx={{ maxHeight: 500, minHeight: 450 }}>
    //             <Table stickyHeader>

    //                 <TableHead style={{ width: "100%" }}>

    //                     <TableRow style={{ width: "100%" }} className={styles.tableRows}>
    //                         <TableCell style={{ width: "30%" }} className={styles.tableCell} >

    //                             <Button style={{
    //                                    color:"black",
    //                                    fontWeight:" bold"
    //                             }} variant="text" disableRipple endIcon={
    //                                 fileNameSortUp?<ArrowUpwardIcon />:<ArrowDownwardIcon />
    //                             } onClick={() => {
    //                                 setFileNameSortUp(!fileNameSortUp)
    //                                 if(fileNameSortUp) sortByDownArrow(pdfList)
    //                                 else sortByUpArrow(pdfList)
    //                             }}>File Name</Button>

    //                         </TableCell>
    //                         <TableCell style={{ width: "10%" }} className={styles.tableCell} >
    //                             <TextField autoComplete="off" className={styles.inputField}
    //                                 sx={{
    //                                     input: {color: 'black' },
    //                                 }}
    //                                 style={{ fontWeight: "bolder", fontSize: "15px" }}
    //                                 InputProps={{
    //                                     disableUnderline: true,
    //                                 }}
    //                                 fullWidth
    //                                 id="standard-select-category"
    //                                 value={fileCategory}
    //                                 select
    //                                 onChange={(e) => getByCategory(e.target.value)}
    //                                 variant="standard" >
    //                                 <h4 style={{ textAlign: "center", padding: "10px" }}>Select Category</h4>
    //                                 {
    //                                     allCategorylist.map((option) => (
    //                                         <MenuItem className={styles.menuList} key={option.value} value={option.value}>
    //                                             {option.value}
    //                                         </MenuItem>
    //                                     ))}
    //                             </TextField>
    //                         </TableCell>
    //                         <TableCell style={{ width: "10%" }} className={styles.tableCell} >Size</TableCell>
    //                         <TableCell className={styles.tableCell}
    //                             style={{
    //                                 minWidth: "100%"
    //                             }} >

    //                             <TextField autoComplete="off" className={styles.inputField}
    //                                 sx={{
    //                                     input: {color: 'black' },
    //                                 }}
    //                                 style={{ fontWeight: "bolder" }}
    //                                 InputProps={{
    //                                     disableUnderline: true,
    //                                 }}
    //                                 fullWidth
    //                                 id="standard-select-category"
    //                                 value={uploadOn}
    //                                 select
    //                                 onChange={(e) => { setFileCategory(e.target.value) }}
    //                                 variant="standard" >
    //                                 {/* <DateRangePicker
    //                                     ranges={[selectionRange]}
    //                                     onChange={handleSelectDateRange}
    //                                 /> */}
    //                                 <MenuItem disabled className={styles.menuList} value={uploadOn}>
    //                                     {uploadOn}
    //                                 </MenuItem>

    //                             </TextField>
    //                             <Button variant="text" onClick={resetAll}
    //                                 style={{
    //                                     marginTop: "-5px"
    //                                 }}
    //                             >
    //                                 <RestartAltIcon />
    //                             </Button>
    //                         </TableCell>
    //                         <TableCell style={{ width: "15%" }} className={styles.tableCell} >Actions</TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>

    //                     {pdfList.length > 0 ?
    //                         pdfList.slice(page * rowperpage, page * rowperpage + rowperpage)
    //                             .map((pdf, index1) => {

    //                                 return (

    //                                     <TableRow key={index1} >

    //                                         <TableCell className={styles.tableCell}>{pdf.fileName}</TableCell>
    //                                         <TableCell className={styles.tableCell}>
    //                                             <Chip size="small" style={{ fontSize: "10px", fontWeight: "bold", width: "100px" }}
    //                                                 className={styles.chip} label={`${pdf.category}`} icon={<FilePresentIcon />} />
    //                                         </TableCell>
    //                                         <TableCell className={styles.tableCell}>{`${pdf.fileSize}MB`}</TableCell>
    //                                         <TableCell className={styles.tableCell}>{new Date(pdf.uploadedAt).toLocaleDateString("en-GB")}</TableCell>
    //                                         <TableCell className={styles.tableCell}
    //                                             style={{
    //                                                 display: "flex",
    //                                                 justifyContent: "space-evenly",
    //                                                 alignItems: "center",
    //                                                 gap: "10px"
    //                                             }}
    //                                         >
    //                                             <Link style={{
    //                                                 display: "flex",
    //                                                 justifyContent: "space-evenly",
    //                                                 alignItems: "center",
    //                                             }}
    //                                                 href={`/pdflist/pdffile/${pdf.fileName}`} target="_blank">
    //                                                 <OpenInNewIcon />
    //                                             </Link>
    //                                             <Button variant="text" color="error"
    //                                                 onClick={() => handleDelete(pdf.id)}
    //                                             >
    //                                                 <DeleteIcon />
    //                                             </Button>
    //                                         </TableCell>
    //                                     </TableRow>
    //                                 )
    //                             }) :
    //                         <TableRow
    //                         ><TableCell colSpan={6} className={styles.tableCell}>{`No File Found`}</TableCell></TableRow>

    //                     }
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>
    //         <TablePagination
    //             className={styles.tablePaginationText}
    //             rowsPerPageOptions={[5, 10, 25, 50]}
    //             rowsPerPage={rowperpage}
    //             page={page}
    //             count={pdfList.length}
    //             component="div"
    //             onPageChange={handlechangepage}
    //             onRowsPerPageChange={handleRowsPerPage}
    //         />
    //     </Paper>
    //     <Link style={{
    //         margin: "10px"
    //     }} href={"/"}><button className={styles.navigateButton} >UPLOaD pdf</button></Link>
    // </div >
  );
}
