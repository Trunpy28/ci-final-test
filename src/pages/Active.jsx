import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const Active = () => {
  const [todoList, setTodoList] = useState(
    localStorage.hasOwnProperty("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []
  );

  const [nameInput, setNameInput] = useState("");

  const [checkedList, setCheckedList] = useState([]);

  const handleAdd = () => {
    setTodoList([...todoList, { name: nameInput, isCompleted: false }]);
    setNameInput("");
  };

  const handleChangeCheckbox = (name, status) => {
    if (status === true) {
      setCheckedList([...checkedList, name]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== name));
    }
  };

  const handleDelete = (name) => {
    setTodoList(todoList.filter((item) => item.name !== name));
    setCheckedList(checkedList.filter((item) => item!== name));
  };
  console.log(checkedList);

  const handleDeleteAll = () => {
    setTodoList(todoList?.filter((item) => !checkedList.includes(item?.name)));
    setCheckedList([]);
  };

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
            cursor: "pointer",
          }}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      {todoList
        ?.filter((todo) => {
          return !todo?.isCompleted;
        })
        .map((todo) => {
          return (
            <div
              key={todo?.name}
              style={{
                width: "100%",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: "5px" }}>
                <Checkbox
                  onChange={(e) => {
                    handleChangeCheckbox(todo?.name, e.target.checked);
                  }}
                />
                <div
                  style={{
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  {todo?.name}
                </div>
              </div>
              {checkedList.includes(todo?.name) && (
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(todo?.name);
                  }}
                />
              )}
            </div>
          );
        })}

      {checkedList.length > 0 && (
        <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <button
            style={{
              fontSize: "14px",
              padding: "20px 15px",
              backgroundColor: "#ff3041",
              cursor: "pointer",
              border: "none",
              borderRadius: "5px",
              color: "white",
            }}
            onClick={handleDeleteAll}
          >
            <DeleteOutlined /> Delete all
          </button>
        </div>
      )}
    </div>
  );
};

export default Active;
