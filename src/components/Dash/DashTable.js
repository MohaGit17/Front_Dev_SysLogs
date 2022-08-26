import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";
import { DeleteUser } from "./DeleteUser";


import "bootstrap/dist/css/bootstrap.min.css";

export const DashTable = () => {
  return (
    <div >
      
        <Router>
          <Routes>
            {/* <Route exact path="/" component={() => <Home users={users} setUsers={setUsers} />} /> */}
            <Route exact path="/" element={<Home/>} />
            <Route path="/add" element={<AddUser/>} />
            <Route path="/edit/:umail" element={<EditUser/>} />
            <Route path="/delete/:umail" element={<DeleteUser/>} />
          </Routes>
        </Router>
      
    </div>
  )
}

