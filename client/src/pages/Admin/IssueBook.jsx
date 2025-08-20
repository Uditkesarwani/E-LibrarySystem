

import React, { useEffect, useState } from "react";
import AdminRouters from "../Routes/AdminRouters";
import axios from "axios";
import { host } from "../../Host";

const IssueBook = () => {
  const [allBooks, setAllBooks] = useState([]);
  
  useEffect(() => {
    const fetchIssueBook = async () => {
      const response = await axios.get(`${host}/admin/totalIssue`);
      if (response.data.success) {
        console.log(response.data);
        setAllBooks(response.data.allBooks);
      }
    };
    fetchIssueBook();
  }, []);

  return (
          <div className="min-h-screen ">
      <AdminRouters />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          All Issued Books
        </h1>

        {allBooks.length > 0 ? (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-blue-600 text-white text-md">
                <tr className="text-center">
                  <th className="px-6 py-4 border">Book ID</th>
                  <th className="px-6 py-4 border">User Name</th>
                  <th className="px-6 py-4 border">Book Name</th>
                  <th className="px-6 py-4 border">Issued Date</th>
                  {/* <th className="px-6 py-4 border">Return Date</th> */}
                </tr>
              </thead>
              <tbody>
                {allBooks.map((book, index) => {
                  const issuedDate = new Date(book.createdAt).toLocaleDateString("en-GB");
                  const returnDate = new Date(book.expiryDate).toLocaleDateString("en-GB");

                  return (
                    <tr
                      key={index}
                      className="text-center hover:bg-blue-50 transition duration-200"
                    >
                      <td className="px-6 py-4 border font-medium text-gray-800">
                        {book.entryId}
                      </td>
                      <td className="px-6 py-4 border">{book.userName}</td>
                      <td className="px-6 py-4 border">
                        {book.BookName}
                        </td>
                      <td className="px-6 py-4 border">{issuedDate}</td>
                      {/* <td className="px-6 py-4 border">{returnDate}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-10 text-center text-red-600 text-xl font-semibold">
            No issued books found.
          </p>
        )}
      </div>
    </div>
  );
};

export default IssueBook;
