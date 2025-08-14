import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaPlus, FaBook, FaMoneyBill, FaClipboardList, FaUndo, FaUser, FaSignOutAlt } from 'react-icons/fa'

const AdminRouters = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
    <nav className="bg-white   shadow-md px-5 py-3 flex flex-wrap items-center justify-between bg-black-500 ">
    
      <div className="text-xl font-bold text-indigo-600">
        Admin Panel
      </div>
      <div className="flex flex-wrap gap-4">
        <Link to="/Adminhome" className={linkClasses("/Adminhome")}>
          <FaPlus /> Add Book
        </Link>

        <Link to="/viewBook" className={linkClasses("/viewBook")}>
          <FaBook /> View Books
        </Link>

        <Link to="/fine" className={linkClasses("/fine")}>
          <FaMoneyBill /> Fine
        </Link>

        <Link to="/issueBook" className={linkClasses("/issueBook")}>
          <FaClipboardList /> Issue Book
        </Link>

        <Link to="/returnBook" className={linkClasses("/returnBook")}>
          <FaUndo /> Return Book
        </Link>

        <Link to="/aboutMe" className={linkClasses("/aboutMe")}>
          <FaUser /> About dev
        </Link>

        <Link to="/Logout" className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all">
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </nav>
  )
}

export default AdminRouters
