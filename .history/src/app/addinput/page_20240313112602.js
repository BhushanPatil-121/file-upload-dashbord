"use client"
import React from 'react'

export default function page() {
    let inputFiled = 0;
    let inputFiledMax = 4;
    const field=new Array(5).fill(0)
    console.log("filed",field);
  return (
    <div className="mt-14">
        <button onClick={()=>{
            inputFiled=inputFiled++;
            field[inputFiled]==1;
        }}>Add Field</button>

        {   filed[inputFiled]===1 &&
            <div>
                <input type="text"/>
            </div>
        }
    </div>
  )
}
