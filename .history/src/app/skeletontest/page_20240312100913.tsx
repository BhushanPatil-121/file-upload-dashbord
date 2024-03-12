import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
export default function page() {
  let noOfRows = new Array(10).fill("rows");
  return (
    <div className="mt-16">
      <div>
        <Table>
         <TableBody>
         {noOfRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              </TableCell>
              <TableCell>
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
