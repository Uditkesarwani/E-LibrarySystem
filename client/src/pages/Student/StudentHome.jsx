

import React, { useEffect, useState } from "react";
import StudentRouters from "../Routes/StudentRouters";
import axios from "axios";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { host } from "../../Host";
const StudentHome = () => {
  const [books, setBooks] = useState([]);
  const [reload, setReload] = useState();
  const [totalCart, setTotalCart] = useState(0);
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState(false)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${host}/student/allBooks`);
        const data = await response.json();
        if (data.success) {
          setBooks(data.books);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, [totalCart]);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = sessionStorage.getItem("id");
      try {
        const response = await fetch(
          `${host}/student/allcart/${userId}`
        );
        const data = await response.json();
        if (data.success) {
          setTotalCart(data.length);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
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

  const handleCart = async (cartId) => {
    const userId = sessionStorage.getItem("id");
    const response = await axios.post(
      `${host}/student/addToCart/${cartId}`,
      { userId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.data.success) {
      // console.log(response.data.msg);
      if (response.data.msg) alert("this item already in your cart");
      setTotalCart(response.data.length);
    }
  };

  const handleWishlist = async(wishId) => {
        const userId = sessionStorage.getItem("id");
    const response = await axios.post(`${host}/student/addwishlist/${wishId}`,{userId},{
      headers:{'Content-Type':'application/json'}
    })
    if(response.data.success){
       if (response.data.msg){ 
        alert("this item already wishlisted");
        setStatus(response.data.msg)
      }
      
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-10 to-purple-100 text-gray-800">
      <StudentRouters />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-4 px-4"
      >
        <input
          type="text"
          placeholder="Search by name, category, or author"
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-[50%] px-4 py-2 rounded-xl border border-gray-300 shadow focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>
      </form>

    
      <h1 className="text-4xl font-bold text-center text-blue-700 mt-10 mb-6">
        📚 Available Books
      </h1>

   
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-12">
        {books.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:scale-[1.01] transition duration-200 relative"
          >
         
            <button
              onClick={() => handleWishlist(item._id)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition"
            >
             
             <FaHeart className="text-2xl text-black hover:scale-110 transition" />
            </button>
          
            <img
              src={`${host}/uploads/${item.image}`}
              alt="book"
              className="w-full h-60 object-cover rounded-xl mb-4"
            />

        
            <div className="flex-1 space-y-1 mb-4">
              <h2 className="text-xl font-semibold text-blue-600">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Book ID:</span> {item.id}
              </p>
              <p className="text-gray-700">Author: {item.author}</p>
              <p className="text-gray-700">Category: {item.catogory}</p>
              <p className="text-gray-700">Quantity: {item.copy}</p>
            </div>

            {totalCart >= 3 ? 
              <button
                disabled
                className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed opacity-70"
              >
                Add To Cart (Limit Reached)
              </button>
            : item.copy > 0 ? 
              <button
                onClick={() => handleCart(item._id)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
              >
                Add To Cart
              </button>
            : 
              <button
                disabled
                className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-200"
              >
                Book is not available
              </button>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentHome;
