import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchFoodList } from "../assets/assets"; // Make sure path is correct

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCart] = useState({});
  const [foodList, setFoodList] = useState([]);

  // Fetch food data on mount
  useEffect(() => {
    const getFood = async () => {
      const data = await fetchFoodList();
      setFoodList(data);
    };
    getFood();
  }, []);

  const addToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id] === 1) {
        delete newCart[id];
      } else {
        newCart[id] -= 1;
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const contextValue = {
    foodList,
    cartItems,
    setCart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
