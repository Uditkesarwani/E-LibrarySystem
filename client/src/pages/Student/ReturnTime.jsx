

import React, { useEffect, useState } from "react";
import StudentRouters from "../Routes/StudentRouters";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { host } from "../../Host";
const ReturnTime = () => {
  const navigate = useNavigate()
  const [allBooks, setAllBooks] = useState([]);
  const [reload, setReload] = useState();

  // Fetch issued books
  useEffect(() => {
    const fetchIssueBook = async () => {
      const userId = sessionStorage.getItem("id");
      const response = await axios.get(
        `${host}/student/issueBook/${userId}`
      );
      if (response.data.success) {
        setAllBooks(response.data.allBooks);
      }
    };
    fetchIssueBook();
  }, [reload]);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setReload(Date.now()); 
    }, 2000); 

    return () => clearInterval(timer);
  }, []);

  // Return book handler
  const handleReturn = async (retId) => {
    let userId = sessionStorage.getItem("id");
    const response = await axios.post(
      `${host}/student/returnBook/${retId}`,
      { userId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.data.success) {
      setReload(Date.now()); // refresh after return
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-10 to-purple-100 text-gray-800">
      <StudentRouters />
      {allBooks.length > 0 ? (
        <div>
          <h1 className="text-blue-500 text-3xl mt-9 font-semibold">
            Please return all books within given days
          </h1>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-6 border-l-4 border-yellow-500 shadow-sm">
         A fine of ₹5/day will be charged after the due date.
      </div>

          <div className="overflow-x-auto shadow-lg rounded-lg border mt-5">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-100 text-gray-800 text-center">
                  <th className="px-4 py-3 border">Book ID</th>
                  <th className="px-4 py-3 border">Book Name</th>
                  <th className="px-4 py-3 border">Issued Date</th>
                  <th className="px-4 py-3 border">Days Left / Fine</th>
                 
                </tr>
              </thead>
              <tbody>
                {allBooks.map((book, index) => {
                  const issuedDate = new Date(book.createdAt);
                  const returnDate = new Date(book.expiryDate);
                  const today = new Date();

              
                  const diffInMs = returnDate - today;
                  const diffInDays = Math.ceil(
                    diffInMs / (1000 * 60 * 60 * 24)
                  );

                  return (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-3 border">{book.entryId}</td>
                      <td className="px-4 py-3 border">{book.BookName}</td>
                      <td className="px-4 py-3 border">
                        {issuedDate.toLocaleDateString("en-GB")}
                      </td>
                      {diffInDays > 0 ? (
                        <td className="px-4 py-3 border">{diffInDays} Days</td>
                      ) :diffInDays === 0? (
                        <td className="px-4 py-3 border text-red-500 font-semibold">
                          Last day 
                        </td>
                      ):
                      <td className="px-4 py-3 border text-red-500 font-semibold">
                          Time is over, pay ₹{Math.abs(diffInDays) * 5}
                        </td>
                      }
                     
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
          <button className="items-center gap-2 bg-green-500 text-white px-30 py-3 mt-9 rounded-md hover:bg-green-600 transition-all"
          onClick={()=>navigate('/yourIssueBook')}>Go to return</button>
        </div>
      ) : (
        <h1 className="text-5xl text-center mt-2 font-semibold">
          No  books found
        </h1>
      )}
    </div>
  );
};

export default ReturnTime;
