import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchFoodList } from "../assets/assets";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartit,setcart]=useState({});
   const [food_list, setFoodList] = useState([]);
  // Fetch food data on mount
  useEffect(() => {
    const getFood = async () => {
      const data = await fetchFoodList();
      setFoodList(data);
    };
    getFood();
  }, []);
  const addtocart=(id)=>{
  if(!cartit[id]){
  setcart((prev)=>({...prev,[id]:1}))
  }
  else{
  setcart((prev)=>({...prev,[id]:prev[id]+1}))
  }
  }
  const clearCart = () => {
    setcart({});
  };
  const remfromcart = (id) => {
    if (cartit[id] === 1) {
      setcart((prev) => {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      });
    } else {
      setcart((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };
  const contextValue = {
   food_list,cartit,setcart,addtocart,remfromcart,clearCart
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
