"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
export default function SkeletonLoadingFiles({cells}:{cells:number}) {
  let noOfRows = new Array(10).fill("rows");
  let noOfCells = new Array(cells).fill("rows");
  return (
    <>
      {noOfRows.map((row, index) => (
        <TableRow key={index}>
          {
            noOfCells.map((cell, index) => (
              <TableCell key={index}>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </TableCell>
            ))
          }
        </TableRow>
      ))}
    </>
  );
}
