import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { accessToken, isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const authHeader = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await axios.get("/api/cart", {
        headers: authHeader,
        withCredentials: true,
      });
      setCart(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const addItem = async (productId, quantity = 1) => {
    const res = await axios.post(
      "/api/cart/add",
      { productId, quantity },
      { headers: authHeader, withCredentials: true }
    );
    setCart(res.data);
  };

  const updateItem = async (productId, quantity) => {
    const res = await axios.put(
      "/api/cart/update",
      { productId, quantity },
      { headers: authHeader, withCredentials: true }
    );
    setCart(res.data);
  };

  const removeItem = async (productId) => {
    const res = await axios.delete(`/api/cart/item/${productId}`, {
      headers: authHeader,
      withCredentials: true,
    });
    setCart(res.data);
  };

  const totalItems =
    cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice =
    cart.items?.reduce((sum, item) => sum + item.quantity * item.price, 0) || 0;

  const value = {
    cart,
    loading,
    addItem,
    updateItem,
    removeItem,
    totalItems,
    totalPrice,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);


