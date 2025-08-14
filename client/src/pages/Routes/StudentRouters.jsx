import React, { useEffect, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import CartContext from "../Context/CartContext";
import { FaShoppingCart, FaHeart, FaBook, FaHome, FaClock, FaSignOutAlt, FaUser } from "react-icons/fa";

const StudentRouters = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { totalCart } = useContext(CartContext);

  useEffect(() => {
    if (!sessionStorage.getItem('id')) {
      navigate('/')
    }
  }, [])

  const linkClasses = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-300 
     ${location.pathname === path
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-600'
     }`

  return (
    <nav className="bg-white shadow-md px-5 py-3 flex flex-wrap items-center justify-between">

      <div className="text-xl font-bold text-indigo-600">
        Student Panel
      </div>

   
      <div className="flex flex-wrap gap-4">
        <Link to="/Studenthome" className={linkClasses("/Studenthome")}>
          <FaHome /> Home
        </Link>

        <Link to="/yourIssueBook" className={linkClasses("/yourIssueBook")}>
          <FaBook /> Your Issue Book
        </Link>

        <Link to="/returnTime" className={linkClasses("/returnTime")}>
          <FaClock /> Return Time
        </Link>

        <Link to="/wishlist" className={linkClasses("/wishlist")}>
          <FaHeart className="text-red-500" /> Wishlist
        </Link>

        <Link to="/yourCart" className={linkClasses("/yourCart")}>
          <div className="relative flex items-center gap-2">
            <FaShoppingCart />
            Cart
            
          </div>
        </Link>

 <Link to="/aboutDev" className={linkClasses("/aboutDev")}>
          <FaUser /> About dev
        </Link>
        <Link to="/Logout" className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all">
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </nav>
  )
}

export default StudentRouters
