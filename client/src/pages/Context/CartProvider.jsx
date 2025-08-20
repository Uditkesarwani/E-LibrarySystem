// src/Context/CartProvider.jsx
import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import { host } from "../../Host";

const CartProvider = ({ children }) => {
  const [totalCart, setTotalCart] = useState(0);
  const [reload, setReload] = useState();

  useEffect(() => {
    const fetchCart = async () => {
      const userId = sessionStorage.getItem("id");
      if(userId!==null){
      try {
        const response = await fetch(`${host}/student/allcart/${userId}`);
        const data = await response.json();
        if (data.success) {
          setTotalCart(data.length);
          // console.log(totalCart);
          
          setReload(Date.now());
        }
      } catch (err) {
        console.log(err);
      }
    }
    };
    fetchCart();
  }, [reload]);

  return (
    <CartContext.Provider value={{ totalCart, setTotalCart, setReload }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
