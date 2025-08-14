import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { host } from '../../Host';

const TotalCartShow = () => {
  const [totalCartItem, setTotalCartItem] = useState([]);
  const [reload, setReload] = useState();
  const [limitCheckOut, setLimitChckOut] = useState(0);
  const [bool, setBool] = useState(false)
  const handleRemove = async (remId) => {
    
    const userId = sessionStorage.getItem("id");
    const response = await axios.post(
      `${host}/student/removeCart/${remId}`,
      { userId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (response.data.success) {
      setReload(Date.now());
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const userId = sessionStorage.getItem("id");
      try {
        const response = await fetch(`${host}/student/allcartItem/${userId}`);
        const data = await response.json();

        if (data.success) {
          setTotalCartItem(data.cartItem);
        }

      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
  }, [reload]);

  useEffect(() => {
    const userId = sessionStorage.getItem("id");

    const fetchTotalCart = async () => {
      const response = await axios.get(`${host}/student/TotalCheckOut/${userId}`)
      if (response.data.success) {
        setLimitChckOut(response.data.length)
      }
    }
    fetchTotalCart()
  }, [reload])

  const handleToCheckOut = async (CheckId) => {
    const userId = sessionStorage.getItem("id");

    const response = await axios.post(`${host}/student/CheckOut/${userId}`, { CheckId }, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.success) {
      setReload(Date.now())
      setLimitChckOut(response.data.length)
      setBool(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-10 to-purple-100 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">📚 Your Cart</h1>

      {totalCartItem.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No items in your cart.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-800 text-center">
                <th className="px-4 py-3 border">Seno</th>
                <th className="px-4 py-3 border">Book Name</th>
                <th className="px-4 py-3 border">Book ID</th>
                <th className="px-4 py-3 border">Author</th>
                <th className="px-4 py-3 border">Category</th>
                <th className="px-4 py-3 border">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {totalCartItem.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">{index+1}</td>                     
                  <td className="px-4 py-3 border">{item.title}</td>
                  <td className="px-4 py-3 border">{item.id.slice(0, 3)}</td>
                  <td className="px-4 py-3 border">{item.author}</td>
                  <td className="px-4 py-3 border">{item.catogory}</td>
                  <td className="px-4 py-3 border">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 text-center">
        {limitCheckOut === 3 ? (
          <button
            disabled
            className="bg-gray-400 text-white px-6 py-3 rounded-lg w-full cursor-not-allowed"
          >
             Checkout limit reached
          </button>
        ) : (
          <button
            onClick={() => handleToCheckOut(totalCartItem)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-full transition duration-200"
          >
            ✅ Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default TotalCartShow;




