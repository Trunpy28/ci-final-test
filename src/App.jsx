import { useLayoutEffect, useState } from 'react'
import './App.css'
import { Tabs } from 'antd';
import All from './pages/All';
import Active from './pages/Active';
import Completed from './pages/Completed';

function App() {
  if(!localStorage.hasOwnProperty("todoList")){
    localStorage.setItem("todoList", JSON.stringify([]));
  }

  const items = [
    {
      key: '1',
      label: <div style={{fontSize: '18px', fontWeight: "500", width: '150px', textAlign: 'center'}}>All</div>,
      children: <All/>,
      destroyInactiveTabPane: true
    },
    {
      key: '2',
      label: <div style={{fontSize: '18px', fontWeight: "500", width: '150px', textAlign: 'center'}}>Active</div>,
      children: <Active/>,
      destroyInactiveTabPane: true
    },
    {
      key: '3',
      label: <div style={{fontSize: '18px', fontWeight: "500", width: '150px', textAlign: 'center'}}>Completed</div>,
      children: <Completed/>,
      destroyInactiveTabPane: true
    },
  ];

  return (
    <div style={{width: "100vw", display: "flex", flexDirection: 'column',alignItems: "center", paddingTop: '30px', gap: "30px"}}>
      <h1 style={{fontSize: "40px", color: '#3e3e3e'}}>#todo</h1>
      <Tabs defaultActiveKey="1" items={items} tabBarGutter={100}/>
    </div>
  )
}

export default App
