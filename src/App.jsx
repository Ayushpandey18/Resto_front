// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import SignInModal from "./pages/SignInModal/SignInModal"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import StoreContextProvider from "./context/Storecontext";
import Footer from "./components/Footer/Footer";
import OrderHistory from "./pages/Offers/Order-history";
import RegisterModal from "./pages/Register-modal/RegisterModal";
import a from "./EN";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      console.log("hello",document.cookie);
      const accessToken = document.cookie.includes("accessToken");
      console.log("hello",accessToken);
      setIsLoggedIn(accessToken);  // If accessToken exists in cookies, set logged in state to true
    };
    checkLoginStatus();
  }, [document.cookie]);

  const openSignIn = () => {
    setIsSignInOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsSignInOpen(false);
  };

  const closeModal = () => {
    setIsSignInOpen(false);
    setIsRegisterOpen(false);
  };

  const handleLogout = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${a}/user/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,  // Send access token in header
        },
      }
    );
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    alert("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Logout failed. Please try again.");
  }
};


  return (
    <div className="App">
      <StoreContextProvider>
        <Navbar
          onLoginClick={openSignIn}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        {isSignInOpen && <SignInModal onClose={closeModal} onOpenRegister={openRegister} />}
        {isRegisterOpen && <RegisterModal onClose={closeModal} />}
        <Footer />
      </StoreContextProvider>
    </div>
  );
}

export default App;
