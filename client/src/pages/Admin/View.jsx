import React, { useEffect, useState } from "react";
import AdminRouters from "../Routes/AdminRouters";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { host } from "../../Host";

const View = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const [filter, setFilter] = useState("");
  const [reload, setReload] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${host}/student/allBooks`);
        const data = await response.json();

        if (data.success) {
          // console.log(data);

          setBooks(data.books);
          setImgPath(data.pathimag);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, [reload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${host}/student/filterBooks`,
        { filter },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setBooks(response.data.books);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (delId) => {
    if(confirm('Do you want to delete book!')){
    let response = await axios.post(
      `${host}/admin/delete-book/${delId}`
    );
    if (response.data.success) {
      console.log("Successfully deleted");
      setReload(Date.now());
    }
    
  }
  };

  return (
          <div className="min-h-screen ">

      <AdminRouters />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 mt-4"
      >
        <input
          type="text"
          placeholder="Find by name, category, author"
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Find
        </button>
      </form>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((item, index) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col gap-2"
          >
            <img
             className="w-full h-60 object-cover rounded-xl mb-4"
              src={`${host}/uploads/${item.image}`}
              alt="book"
            />
            <p className="text-sm text-gray-500">
              Book ID: {item.id}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Title: {item.title}
            </p>
            <p>Author: {item.author}</p>
            <p>Copies: {item.copy}</p>
            <p>Category: {item.catogory}</p>
            

            <div className="flex gap-4 mt-3 ">
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                onClick={() => navigate(`/update/${item._id}`)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
