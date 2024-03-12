"use client"
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "next-themes";
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
export default function page() {
  let noOfRows = new Array(10).fill("rows");
  return (
    <div className="mt-16">
      <div>
        <Table>
          <TableBody>
            {noOfRows.map((row, index) => (
              <TableRow key={index}  sx={
                                theme === "light"
                                  ? styles.lightHover
                                  : styles.darkHover
                              }>
                <TableCell  sx={
                                theme === "light"
                                  ? styles.lightHover
                                  : styles.darkHover
                              }>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell  sx={
                                theme === "light"
                                  ? styles.lightHover
                                  : styles.darkHover
                              }>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell  sx={
                                theme === "light"
                                  ? styles.lightHover
                                  : styles.darkHover
                              }>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell  sx={
                                theme === "light"
                                  ? styles.lightHover
                                  : styles.darkHover
                              }>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell  sx={
                                theme === "light"
                                  ? styles.lightHover
                                  : styles.darkHover
                              }>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell  sx={
                                theme === "light"
                                  ? styles.lightHover
                                  : styles.darkHover
                              }>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <Skeleton className="w-[100px] h-[20px] rounded-full" /> */}
    </div>
  );
}
