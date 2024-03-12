import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function page() {
  return (
    <div className="mt-16">
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
                                      >
                                        <RemoveRedEyeIcon /> View
                                      </Button>
                                    </SheetTrigger>
                                    <SheetContent className="z-[200] w-[350px] sm:w-2/3 sm:max-w-none p-10">
                                      <div className="w-full  h-full overflow-y-scroll ">
                                        <embed
                                          title="PDF Viewer"
                                          src={pdf.pdf}
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                          }}
                                        />
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
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </div>
  );
}
