import React from "react";
import "./App.css";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import StudentHome from "./pages/Student/StudentHome";
import AdminHome from "./pages/Admin/AdminHome";
import Fine from "./pages/Admin/Fine";
import IssueBook from "./pages/Admin/IssueBook";
import Return from "./pages/Admin/Return";
import View from "./pages/Admin/View";
import Cart from "./pages/Student/Cart";
import CheckOut from "./pages/Student/CheckOut";
import YourIssueBook from "./pages/Student/YourIssueBook";
import Logout from "./Logout";
import Update from "./pages/Admin/Update";
import ReturnTime from "./pages/Student/ReturnTime";
import WishList from "./pages/Student/WishList";
import About from "./pages/Admin/About";
import AboutDev from "./pages/Student/AboutDev";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      
        <Routes style={{marginTop:'2rem'}}>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/Studenthome" element={<StudentHome />}></Route>

          <Route path="/yourIssueBook" element={<YourIssueBook />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Adminhome" element={<AdminHome />}></Route>
          <Route path="/fine" element={<Fine />}></Route>
          <Route path="/issueBook" element={<IssueBook />}></Route>
          <Route path="/returnBook" element={<Return />}></Route>
          <Route path="/yourCart" element={<Cart />}></Route>
          <Route path="/viewBook" element={<View />}></Route>
          <Route path="/checkOut" element={<CheckOut />}></Route>
          <Route path="/update/:_id" element={<Update />}></Route>
          <Route path="/returnTime" element={<ReturnTime />}></Route>
          <Route path="/wishlist" element={<WishList />}></Route>
          <Route path="/aboutMe" element={<About />}></Route>
          <Route path="/aboutDev" element={<AboutDev />}></Route>
          
          <Route path="/Logout" element={<Logout />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
