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
import SkeletonLoadingFiles from "@/components/SkeletonLoadingFiles";
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
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [deleteFileName, setDeleteFileName] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showEditPopUp, setShowEditPopUp] = useState<boolean>(false);
  const [listIsEmpty, setListIsEmpty] = useState(false);
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
      if (data.fileList.length === 0) {
        setListIsEmpty(true);
      }
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
    if (
      editField.fileName.length > 0 &&
      editField.category.length > 0 &&
      date
    ) {
      setShowMissingFieldError(false);
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
    } else {
      setShowMissingFieldError(true);
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
    if (filteredList.length <= 0) {
      setListIsEmpty(true);
    } else {
      setListIsEmpty(false);
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
    // create link element on dom and add click event
    const downloadLink = document.createElement("a");
    const downloadFileName = fileName + ".pdf"; //.pdf for file extension
    downloadLink.href = pdf;
    downloadLink.download = downloadFileName; // downloaded filename
    downloadLink.click();
  };

  return (
    <div>
      File Page
    </div>

  );
}
