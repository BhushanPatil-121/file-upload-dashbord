"use client"
import React from 'react'

export default function page() {
    let inputField = 0;
    let inputFieldMax = 4;
    const filed=new Array(5).fill(0)
    console.log("filed",filed);
  return (
    <div className="mt-14">
        <button onClick={()=>{
            inputFiled
        }}>Add Field</button>

        {   filed[inputFiled]===1 &&
            <div>
                <input type="text"/>
            </div>
        }
    </div>
  )
}
