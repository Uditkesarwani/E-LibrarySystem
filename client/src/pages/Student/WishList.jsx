import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import StudentRouters from "../Routes/StudentRouters";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { host } from "../../Host";

const WishList = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState([]);
  const [reload, setReload] = useState();

  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = sessionStorage.getItem("id");
      const response = await axios.get(
        `${host}/student/getWishlist/${userId}`
      );
      if (response.data.success) {
        setBooks(response.data.books);
      }
    };
    fetchWishlist();
  }, [reload]);

  const removeWishlist = async (remId) => {
    const userId = sessionStorage.getItem("id");
    const response = await axios.post(
      `${host}/student/remove-Wishlist/${remId}`,
      { userId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.data.success) {
      setReload(Date.now());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-10 to-purple-100 text-gray-800">
      <StudentRouters />

      <div className="max-w-7xl mx-auto px-4 py-8">
    
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-4xl">💖</span>
          <h1 className="text-3xl font-bold text-blue-700">My Wishlist</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.length > 0 ? (
            books.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl hover:scale-[1.02] transition duration-300"
              >
                <img
                  src={`${host}/uploads/${item.image}`}
                  alt="book"
                  className="w-full h-60 object-cover"
                />

                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-blue-600 mb-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Book ID:</span> {item.id}
                    </p>
                    <p className="text-gray-700">Author: {item.author}</p>
                    <p className="text-gray-700">
                      Category: {item.catogory}
                    </p>
                  </div>

                  <button
                    onClick={() => removeWishlist(item._id)}
                    className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white py-2 px-4 rounded-lg transition duration-200 font-medium"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
              <FaHeart className="text-5xl text-gray-400 mb-4" />
              <p className="text-lg font-medium">Your wishlist is empty</p>
               <button
         className="w-1/2 bg-green-500 mt-4 text-1xl  text-white py-3 px-4 rounded-lg transition duration-200"
     onClick={()=>navigate('/Studenthome')}
     >Browse item</button>
 
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;
