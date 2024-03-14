"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
export default function TestPage() {
  const [inputField, setinputField] = useState(0);
  const [field, setfield] = useState(new Array(5).fill(0));
  useEffect(() => {
    console.log("called");
  }, [field]);
  return (
    <Card className="flex flex-col justify-center items-center mt-14 h-[650px] max-w-[600px]  bg-black ">
      <Button
        className="p-5 m-10"
        onClick={() => {
          if (inputField <= 4) {
            console.log(inputField);
            field[inputField] = 1;
            setinputField(inputField + 1)
            console.log(field[inputField] === 1);
          }
        }}
      >
        Add Field
      </Button>
      <Button
        className="p-5 m-10"
        onClick={() => {
          if (inputField <= 4) {
            console.log(inputField);
            field[inputField] = 1;
            setinputField(inputField + 1)
            console.log(field[inputField] === 1);
          }
        }}
      >
        Add Field
      </Button>
      {field[inputField-1] === 1 && (
        <Input id="fileName" placeholder="Name of your file" />
      )}
      {/* {field[inputField - 1]  (
        <Button className="bg-red">
          <input type="text" />
        </Button>
      )} */}
    </Card>
  );
}
