"use client";
import React from "react";

export default function page() {
  let inputFiled = 0;
  let inputFiledMax = 4;
  const field = new Array(5).fill(0);
  console.log("filed", field);
  return (
    <div className="mt-14">
      <button
        onClick={() => {
            console.log(inputFiled)
          field[inputFiled] == 1;
          inputFiled = inputFiled + 1;
          console.log(filed)
          console.log(inputFiled)
        }}
      >
        Add Field
      </button>

      {field[inputFiled - 1] === 1 && (
        <div className="bg-red">
          <input type="text" />
        </div>
      )}
    </div>
  );
}
