
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { host } from '../../Host';
const CheckOut = () => {
  const navigate = useNavigate();
  const [totalCartItem, setTotalCartItem] = useState([]);
  const [reload, setReload] = useState();
  const [limitCheckOut, setLimitChckOut] = useState(0);
  const [bool, setBool] = useState(false);
  const [limitIssue, setLimitIssue] = useState(0);
  const [allbooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchCountIssue = async () => {
      const userId = sessionStorage.getItem("id");
      try {
        const response = await fetch(`${host}/student/TotalissueCount/${userId}`);
        const data = await response.json();
        if (data.success) setLimitIssue(data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCountIssue();
  }, []);

  const handleRemove = async (remId) => {
    const userId = sessionStorage.getItem("id");
    const response = await axios.post(
      `${host}/student/removeCart/${remId}`,
      { userId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.data.success) setReload(Date.now());
  };

  useEffect(() => {
    const fetchCart = async () => {
      const userId = sessionStorage.getItem("id");
      try {
        const response = await fetch(`${host}/student/allcartItem/${userId}`);
        const data = await response.json();
        if (data.success) setTotalCartItem(data.cartItem);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
  }, [reload]);

  useEffect(() => {
    const fetchIssueBook = async () => {
      const userId = sessionStorage.getItem("id");
      const response = await axios.get(
        `${host}/student/issueBook/${userId}`
      );
      if (response.data.success) setAllBooks(response.data.allBooks);
    };
    fetchIssueBook();
  }, [reload]);

  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    const fetchTotalCart = async () => {
      const response = await axios.get(`${host}/student/TotalCheckOut/${userId}`);
      if (response.data.success) setLimitChckOut(response.data.length);
    };
    fetchTotalCart();
  }, [reload]);

  const handleToCheckOut = async (CheckId) => {
    const userId = sessionStorage.getItem("id");
    const response = await axios.post(`${host}/student/CheckOut/${userId}`, { CheckId }, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.success) {
      setReload(Date.now());
      setLimitChckOut(response.data.length);
      setBool(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {!bool ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
            📚 Check Out Books
          </h1>

          <p
            className="text-blue-500 cursor-pointer hover:underline mb-6 inline-block"
            onClick={() => navigate('/yourCart')}
          >
            ← Back to Cart
          </p>

          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-gray-700">
              You can only issue <span className="font-bold text-blue-600">3 books</span>
            </p>
            <p className="text-gray-700">
              Already issued:{" "}
              <span className="font-bold text-red-600">{limitIssue}</span>
            </p>
          </div>

          {totalCartItem.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No items in your cart.</p>
          ) : (
            <div className="overflow-x-auto shadow-lg rounded-lg border bg-white">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-gray-800 text-center">
                    <th className="px-4 py-3 border">S.No</th>
                    <th className="px-4 py-3 border">Book Name</th>
                    <th className="px-4 py-3 border">Book ID</th>
                    <th className="px-4 py-3 border">Author</th>
                    <th className="px-4 py-3 border">Category</th>
                    <th className="px-4 py-3 border">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center">
                  {totalCartItem.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 border">{index + 1}</td>
                      <td className="px-4 py-3 border">{item.title}</td>
                      <td className="px-4 py-3 border">{item.id}</td>
                      <td className="px-4 py-3 border">{item.author}</td>
                      <td className="px-4 py-3 border">{item.catogory}</td>
                      <td className="px-4 py-3 border">
                        {allbooks.some((a) => a.bookId === item._id) ? (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                            Already Issued
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">
                            Available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6">
            {limitIssue === 3 ? (
              <button
                disabled
                className="bg-gray-400 text-white px-6 py-3 rounded-lg w-full cursor-not-allowed"
              >
                ⚠️ Your issue limit is over
              </button>
            ) : (
              <button
                onClick={() => handleToCheckOut(totalCartItem)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-full transition"
              >
                ✅ Proceed to Checkout
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            ✅ Checkout Successful!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for borrowing the books.
          </p>
          <button
            onClick={() => navigate('/yourCart')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
          >
            ← Back to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckOut;
