"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
export default function page() {
  let inputField = 0;
  let inputFieldMax = 4;
  const field = new Array(5).fill(0);
  console.log("filed", field);
  return (
    <Card className="flex flex-col justify-center items-center mt-14 h-[650px] w-[600px]  bg-black ">
      <Button
        className="p-5 m-10"
        onClick={() => {
          console.log(inputField);
          if (inputField <= inputFieldMax) {
            field[inputField] = 1;
            inputField = inputField + 1;
          }
          console.log(field);
          console.log(inputField);
        }}
      >
        Add Field
      </Button>
      <Input
        id="fileName"
        placeholder="Name of your file"
      />
      {/* {field[inputField - 1]  (
        <Button className="bg-red">
          <input type="text" />
        </Button>
      )} */}
    </Card>
  );
}
