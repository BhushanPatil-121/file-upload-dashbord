"use client";
import React from "react";

export default function page() {
  let inputField = 0;
  let inputFieldMax = 4;
  const field = new Array(5).fill(0);
  console.log("filed", field);
  return (
    <div className="mt-14">
      <button className="bg-green m-10 p-5 "
        onClick={() => {
            console.log(inputField)
          field[inputField] == 1;
          inputField= inputField + 1;
          console.log(field)
          console.log(inputField)
        }}
      >
        Add Field
      </button>

      {field[inputField - 1] === 1 && (
        <div className="bg-red">
          <input type="text" />
        </div>
      )}
    </div>
  );
}
