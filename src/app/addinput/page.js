"use client"
import React, { useState } from 'react';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
      {/* <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      /> */}
    </div>
  );
}
// import React, { useState } from "react";
// import Select from "react-select";
// export default function AddInput() {
// //   const [inputList, setInputList] = useState([{ columnName: "", value: "" }]);
// //   const [form, setForm] = useState([
// //     { col1: "",
// //      col2: "" ,
// //      col3:"",
// //      col4:""
// //     }]);
// //   // handle input change
// //   const handleInputChange = (e, index) => {
// //     const { name, value } = e.target;
// //     const list = [...inputList];
// //     list[index][name] = value;
// //     setInputList(list);
// //   };

// //   // handle click event of the Remove button
// //   const handleRemoveClick = (index) => {
// //     const list = [...inputList];
// //     const remove = list.filter((_, indexFilter) => !(indexFilter === index));
// //     // list.splice(index, 1);
// //     setInputList(remove);
// //   };

// //   // handle click event of the Add button
// //   const handleAddClick = () => {
// //     setInputList([...inputList, { columnName: "", value: "" }]);
// //   };
// //   const handleSaveClick = () => {
// //     setInputList([...inputList, { columnName: "", value: "" }]);
// //   };
// //   return (
// //     <div className="flex flex-col mt-14 p-10 gap-4">
   
// //       {inputList.map((x, i) => {
// //         return (
// //           <div className="flex flex-row gap-4" key={i}>
// //             <select onChange={(e) => handleInputChange(e, i)}>
// //               <option value="col1">col1</option>
// //               <option value="col2">col2</option>
// //               <option value="col3">col3</option>
// //               <option value="col4">col4</option>
// //             </select>
// //             {/* <input
// //               name="columnName"
// //               placeholder="select column"
// //               value={x.columnName}
// //               onChange={(e) => handleInputChange(e, i)}
// //             /> */}
// //             <input
// //               className="ml10"
// //               name="value"
// //               placeholder="Enter value"
// //               value={x.value}
// //               onChange={(e) => handleInputChange(e, i)}
// //             />
// //             <div className="btn-box flex gap-4">
// //               {inputList.length !== 1 && (
// //                 <button className="mr10" onClick={() => handleRemoveClick(i)}>
// //                   Remove
// //                 </button>
// //               )}
// //               {inputList.length - 1 === i && (
// //                 <button onClick={handleAddClick}>Add</button>
// //               )}
// //             </div>
// //           </div>
// //         );
// //       })}
// //       <div style={{ marginTop: 20 }}  onClick={handleSaveClick}>Save</div>
// //       <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
// //     </div>
// //   );
// const [selectedOption, setSelectedOption] = useState();

//   const handleChange = (selectedOption) => {
//     setSelectedOption(selectedOption);
//   }
//   const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//   ];

//   return (
//     <div>
//       <Select
//         isMulti
//         hideSelectedOptions={true}
//         defaultValue={{ value: 'chocolate', label: 'Chocolate' }} // default value must be like this.
//         value={selectedOption} //You forgot pass this  parameter
//         onChange={handleChange}
//         options={options}
//       />
//     </div>
//   );
// }

