import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
const All = () => {
  const [todoList, setTodoList] = useState(
    localStorage.hasOwnProperty("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []
  );

  const [nameInput, setNameInput] = useState("");

  const handleAdd = () => {
    setTodoList([...todoList, { name: nameInput, isCompleted: false }]);
    setNameInput("");
  };

  const handleChangeCheckbox = (name, status) => {
    setTodoList(
      todoList.map((item) => {
        if (item.name === name) {
          return {...item, isCompleted: status };
        } else {
          return item;
        }
      })
    );
  }

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="add details"
          style={{
            borderRadius: "10px",
            padding: "10px",
            width: "80%",
            border: "2px solid #ECECEC",
          }}
          value={nameInput}
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
        />
        <button
          style={{
            backgroundColor: "#0084F5",
            border: "none",
            borderRadius: "10px",
            padding: "10px",
            width: "80px",
            color: "white",
            fontWeight: "500",
            cursor: "pointer"
          }}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      {todoList?.map((todo) => {
        return (
        <div key={todo?.name} style={{width: "100%", marginBottom: "10px"}}>
          <div style={{display: 'flex', gap: '5px'}}>
            <Checkbox checked={todo?.isCompleted} onChange={(e) => {handleChangeCheckbox(todo?.name,e.target.checked)}} />
            <div style={{fontSize: '14px', textDecoration: todo?.isCompleted ? 'line-through' : 'none'}}>{todo?.name}</div>
          </div>
        </div>);
      })}
    </div>
  );
};

export default All;
