"use client"
import React, { useState } from "react";

export default function AddInput() {
  const [inputList, setInputList] = useState([{ columnName: "", value: "" }]);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    const remove = list.filter((_, indexFilter) => !(indexFilter === index));
    // list.splice(index, 1);
    setInputList(remove);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { columnName: "", value: "" }]);
  };
  return (
    <div className="flex flex-col mt-14 p-10 gap-4">
   
      {inputList.map((x, i) => {
        return (
          <div className="flex flex-row gap-4" key={i}>
            <input
              name="columnName"
              placeholder="select column"
              value={x.columnName}
              onChange={(e) => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="value"
              placeholder="Enter value"
              value={x.value}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div className="btn-box flex gap-4">
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>>Save</div>
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

