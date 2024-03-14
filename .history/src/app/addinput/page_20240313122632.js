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
    if()
    console.log("called");
  }, [field]);
  return (
    <Card className="gap-4 flex flex-col justify-center items-center mt-14 h-[650px] w=1/2  bg-black ">
      <Button
        className="p-5 m-10"
        onClick={() => {
          console.log("inputField",inputField);
          if (inputField <= 4) {
            console.log(inputField);
            field[inputField] = 1;
            setinputField(inputField + 1);
            console.log(field[inputField] === 1);
          }
        }}
      >
        Add Field
      </Button>
      <Button
        className="p-5 m-10"
        onClick={() => {
          if (inputField > 0) {
            setinputField(inputField - 1);
            console.log(inputField);
            field[inputField] = 0;
            console.log(field[inputField] === 1);
          }
        }}
      >
        Remove Field
      </Button>
      {field[0] === 1 && (
        <Input id="fileName" placeholder="Name of your file" />
      )}
      {field[1] === 1 && (
        <Input id="fileName" placeholder="Name of your file" />
      )}
      {field[2] === 1 && (
        <Input id="fileName" placeholder="Name of your file" />
      )}
      {field[3] === 1 && (
        <Input id="fileName" placeholder="Name of your file" />
      )}
      {field[4] === 1 && (
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
