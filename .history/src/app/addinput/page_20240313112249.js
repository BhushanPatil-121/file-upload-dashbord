"use client"
import React from 'react'

export default function page() {
    let inputField = 1;
    let inputFieldMax = 5;
    const filed=new Array(5).fill(0)
    console.log("filed",filed);
  return (
    <div className="mt-14">
        <button onClick={()}>Add Field</button>
    </div>
  )
}
