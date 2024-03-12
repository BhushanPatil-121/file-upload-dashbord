import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
export default function page() {
  return (
    <div className="mt-16">
      <div>
        <TableRow>
          <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
          <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
          <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
          <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
          <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
        </TableRow>
      </div>

      {/* <Skeleton className="w-[100px] h-[20px] rounded-full" /> */}
    </div>
  );
}
