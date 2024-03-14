"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
export default function SkeletonLoadingFiles() {
  let noOfRows = new Array(10).fill("rows");
  return (
    <>
      {noOfRows.map((row, index) => (
        <TableRow key={index}>
          
        </TableRow>
      ))}
    </>
  );
}
