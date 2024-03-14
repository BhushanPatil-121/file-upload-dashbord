"use client";
import React from "react";
import { Button } from "@/components/ui/button";
export default function page() {
  let inputField = 0;
  let inputFieldMax = 4;
  const field = new Array(5).fill(0);
  console.log("filed", field);
  return (
    <div>
      <div className="mt-14 p-10 bg-red-500 h-[1000px] w-full">
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
        <div className="red">
          <input type="text" placeholder="input" />
        </div>
        {/* {field[inputField - 1]  (
        <Button className="bg-red">
          <input type="text" />
        </Button>
      )} */}
      </div>
    </div>
  );
}
