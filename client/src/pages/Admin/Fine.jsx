import React, { useEffect, useState } from "react";
import AdminRouters from "../Routes/AdminRouters";
import axios from "axios";
import { host } from "../../Host";

const Fine = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchReturnBook = async () => {
      const response = await axios.get(`${host}/admin/allReturnBook`);
      if (response.data.success) {
        setAllBooks(response.data.returnBook);
      }
    };
    fetchReturnBook();
  }, []);

  return (
    <div className="min-h-screen">
      <AdminRouters />

      {allBooks.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            Fine Gained
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-blue-100 text-gray-800 text-center">
                  <th className="px-6 py-3 border">Student Name</th>
                  <th className="px-6 py-3 border">Book Name</th>
                  <th className="px-6 py-3 border">Student Returned</th>
                  <th className="px-6 py-3 border">Issued Date</th>
                  <th className="px-6 py-3 border">Return Date (Due)</th>
                  <th className="px-6 py-3 border">Fine</th>
                </tr>
              </thead>
              <tbody>
                {allBooks.map((book, index) => {
                  const actualReturnDate = new Date(book.today); 
                  const issueDate = new Date(book.issueDate);
                  const returnDate = new Date(book.expiryDate); 
                  return (
                    <tr
                      key={index}
                      className="text-center hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3 border">{book.userName}</td>
                      <td className="px-6 py-3 border">{book.bookName}</td>
                      <td className="px-6 py-3 border">
                        {actualReturnDate.toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-3 border">
                        {issueDate.toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-3 border">
                        {returnDate.toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-3 border">
                        {book.date > 0 ? (
                          <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                            ₹{book.date*5} Fine
                          </span>
                        ) : (
                          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            No Fine Applicable
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-red-500 text-2xl font-semibold">
            No returned books found.
          </p>
        </div>
      )}
    </div>
  );
};

export default Fine;
