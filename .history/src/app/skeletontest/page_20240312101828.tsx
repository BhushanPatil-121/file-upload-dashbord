"use client"
import { Skeleton } from "@/components/ui/skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import  {useTheme}  from "next-themes";
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
};
export default function page() {
    let noOfRows = new Array(10).fill("rows");
    const { theme } = useTheme();
  return (
    <div className="mt-16">
      <div>
        <Table>
          <TableBody>
            {noOfRows.map((row, index) => (
              <TableRow
                key={index}
                sx={theme === "light" ? styles.lightHover : styles.darkHover}
              >
                <TableCell
                  sx={theme === "light" ? styles.lightHover : styles.darkHover}
                >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell
                  sx={theme === "light" ? styles.lightHover : styles.darkHover}
                >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell
                  sx={theme === "light" ? styles.lightHover : styles.darkHover}
                >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell
                  sx={theme === "light" ? styles.lightHover : styles.darkHover}
                >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell
                  sx={theme === "light" ? styles.lightHover : styles.darkHover}
                >
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </TableCell>
                <TableCell
                  sx={theme === "light" ? styles.lightHover : styles.darkHover}
                >
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
