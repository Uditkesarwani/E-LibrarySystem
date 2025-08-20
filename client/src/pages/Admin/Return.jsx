import React, { useEffect, useState } from "react";
import AdminRouters from "../Routes/AdminRouters";
import axios from "axios";
import { host } from "../../Host";

const Return = () => {
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
          <div className="min-h-screen ">

      <AdminRouters />

      {allBooks.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            Returned Books Overview
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-blue-100 text-gray-800 text-center">
                  <th className="px-6 py-3 border">Student Name</th>
                  <th className="px-6 py-3 border">Book Name</th>
                  <th className="px-6 py-3 border">Student returned book date 👇</th>
                   <th className="px-6 py-3 border">issued Date</th>
                  {/* <th className="px-6 py-3 border">Fine</th> */}
                </tr>
              </thead>
              <tbody>
                {allBooks.map((book, index) => {
                  const returnDate = new Date(book.today).toLocaleDateString("en-GB");
                  const issueDate = new Date(book.issueDate).toLocaleDateString("en-GB");

                  return (
                    <tr key={index} className="text-center hover:bg-gray-50 transition">
                      <td className="px-6 py-3 border">{book.userName}</td>
                      <td className="px-6 py-3 border">{book.bookName}</td>
                      <td className="px-6 py-3 border">{returnDate}</td>
                      <td className="px-6 py-3 border">{issueDate}</td>
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

export default Return;
