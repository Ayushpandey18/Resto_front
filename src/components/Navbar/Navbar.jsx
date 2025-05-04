import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = ({ onLoginClick, isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility for mobile screens
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={assets.logo} alt="Restomania logo" className="logo-img" />
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/menu" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/Order-history" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Your Orders
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => (isActive ? 'active-link' : '')}
          >
            Cart
          </NavLink>
        </li>

        {/* Show login button if the user is not logged in */}
        {!isLoggedIn && (
          <li>
            <NavLink 
              className="login-button" 
              onClick={onLoginClick}
            >
              Login
            </NavLink>
          </li>
        )}

        {/* Show logout button if the user is logged in */}
        {isLoggedIn && (
          <li>
             <NavLink
            className="logout-button" onClick={onLogout}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
