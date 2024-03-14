"use client"
import React, { useState } from "react";

export default function AddInput() {
  const [inputList, setInputList] = useState([{ columnName: "", lastName: "" }]);
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
    setInputList([...inputList, { columnName: "", lastName: "" }]);
  };
  return (
    <div className="mt-14 p-10">
   
      {inputList.map((x, i) => {
        return (
          <div className="box" key={i}>
            <input
              name="columnName"
              placeholder="Enter First Name"
              value={x.columnName}
              onChange={(e) => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="lastName"
              placeholder="Enter Last Name"
              value={x.lastName}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div className="btn-box">
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
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

