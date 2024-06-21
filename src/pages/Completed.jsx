import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const Completed = () => {
  const [todoList, setTodoList] = useState(
    localStorage.hasOwnProperty("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []
  );

  const [checkedList, setCheckedList] = useState([]);

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
      {todoList
        ?.filter((todo) => {
          return todo?.isCompleted;
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
                    textDecoration: "line-through",
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

export default Completed;
