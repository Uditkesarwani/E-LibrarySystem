import React, { useEffect, useState } from "react";
import StudentRouters from "../Routes/StudentRouters";
import axios from "axios";
import { host } from "../../Host";

const YourIssueBook = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [reload, setReload] = useState();
  useEffect(() => {
    const fetchIssueBook = async () => {
      const userId = sessionStorage.getItem("id");
      const response = await axios.get(
        `${host}/student/issueBook/${userId}`
      );
      if (response.data.success) {
        console.log(response.data.allBooks);
        setAllBooks(response.data.allBooks);
      }
    };
    fetchIssueBook();
  }, [reload]);

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
      setAllBooks(response.data.allBooks);
      setReload(Date.now());
    }
  };

  return (
    <div className="min-h-screen ">
      

      <StudentRouters />
      {allBooks.length>0?
      <div className="mt-9">
              <h1 className="text-blue-500 text-3xl">Your Issue Book</h1>

      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-6 border-l-4 border-yellow-500 shadow-sm">
        Please return your books within 7 days. A fine of ₹5/day will be charged
        after the due date.
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg border">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-800 text-center">
              <th className="px-4 py-3 border">Book ID</th>
              <th className="px-4 py-3 border">Book Name</th>
              <th className="px-4 py-3 border">Issued Date</th>
              <th className="px-4 py-3 border">You will Return </th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allBooks) && allBooks.length > 0 ? (
              allBooks.map((book, index) => {
                const issuedDate = new Date(book.createdAt).toLocaleDateString(
                  "en-GB"
                );
                const returnDate = new Date(book.expiryDate).toLocaleDateString(
                  "en-GB"
                );

                return (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-3 border">
                      {book.entryId}
                    </td>
                    <td className="px-4 py-3 border">{book.BookName}</td>
                    <td className="px-4 py-3 border">{issuedDate}</td>
                    <td className="px-4 py-3 border">{returnDate}</td>
                    <td className="px-4 py-3 border">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
                        onClick={() => handleReturn(book.bookId)}
                      >
                        Return Book
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center text-gray-500">
                  No issued books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div></div>:<h1 className="text-5xl mt-42">Not any issue book here</h1>
      }
      
    </div>
  );
};

export default YourIssueBook;
