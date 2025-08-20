import React, { useEffect, useState } from 'react';
import StudentRouters from '../Routes/StudentRouters';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CartContext from '../Context/CartContext';
import { host } from '../../Host';


const Cart = () => {
  const navigate = useNavigate()
  const [bool , setBool] = useState(true)

  const handleProcess=()=>{
    navigate('/checkOut')
  }

  const [totalCartItem, setTotalCartItem] = useState([]);
  const [reload, setReload] = useState();
  const [limitCheckOut, setLimitChckOut] = useState(0)

  const handleRemove = async (remId) => {
    if(confirm('are you sure for remove cart')){
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
  }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const userId = sessionStorage.getItem("id");
      if(!userId){
        navigate('/')
      }
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

 
  useEffect(()=>{
          const userId = sessionStorage.getItem("id");

   const fetchTotalCart=async()=>{
    const response = await axios.get(`${host}/student/TotalCheckOut/${userId}`)
    if(response.data.success){
    setLimitChckOut(response.data.length)
    }
   }
   fetchTotalCart()
  },[reload])


 
  
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <StudentRouters />
      
     
    {
      totalCartItem.length>0?
      <div> <h1 className="text-3xl font-bold text-center py-12 ">Your Cart</h1>

      
      
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-10">
          {totalCartItem.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <div className="mb-4 space-y-1">
                 <img
              src={`${host}/uploads/${item.image}`}
              alt="book"
            />
                <h2 className="text-xl font-semibold text-blue-600">{item.title}</h2>
                <p className="text-sm font-medium text-gray-600">Book ID: <span className="font-bold">{item.id}</span></p>
                <p className="text-gray-700">Author: {item.author}</p>
                <p className="text-gray-700">Category: {item.catogory}</p>
              </div>

              <button
                onClick={() => handleRemove(item._id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
              >
                Remove From Cart
              </button>
            

            </div>
          ))}
          
        </div>
         <button
         className="w-1/1 bg-gray-500  text-white py-2 px-4 rounded-lg transition duration-200"
     onClick={handleProcess}
     >Click here</button>
        </div>:
      <div><p className=" text-center text-gray-600 text-lg pt-42">No items in your cart.</p>
       <button
         className="w-1/2 bg-green-500 mt-4 text-1xl  text-white py-3 px-4 rounded-lg transition duration-200"
     onClick={()=>navigate('/Studenthome')}
     >Browse cart</button>
     </div>
}
    </div>
  );
};

export default Cart;











