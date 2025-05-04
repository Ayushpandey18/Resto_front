import React, { useState } from "react";
import "./SignInModal.css";
import { loginUser } from "../../Utils/api"; // Adjust this path based on your project structure

const SignInModal = ({ onClose, onOpenRegister }) => {
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); 
    try {
      // Prepare login data
      const loginData = {
        email: email.trim() || undefined, 
        phoneno: phoneno.trim() || undefined,
        password: password.trim(),
      };

      // Call the login API function
      const response = await loginUser(loginData);

      // Handle successful login
      if (response.statusCode === 200) {
        setMessage("Login successful!");
        onClose(); 
      }
    } catch (error) {
      // Handle login error
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="sign-in-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="phone">Mobile Number:</label>
          <input
            type="text"
            id="phone"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
        {message && <p className="message">{message}</p>} {/* Display messages */}
        <button className="register-button" onClick={onOpenRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
