import React, { useState, useEffect } from "react";
import "./Register-modal.css";
import { registerUser } from "../../Utils/api"; // Import register function from api.js

const RegisterModal = ({ onClose }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for feedback messages
  const [messageType, setMessageType] = useState(""); // State for message type (success/error)

  const handleSubmit = async () => {
    const registrationData = {
      fullname: fullname.trim(),
      email: email.trim(),
      password: password.trim(),
      phoneno: phoneno.trim(),
    };

    try {
      const result = await registerUser(registrationData);
      setMessage("User registered successfully!"); // Success message
      setMessageType("success");
      console.log("User registered successfully:", result);
      setTimeout(() => {
        onClose();
      }, 3000); 
    } catch (error) {
      setMessage(`Registration error: ${error.message}`); // Error message
      setMessageType("error");
      console.error("Registration error:", error.message);
    }
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="register-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Register</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
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
          <button type="submit" className="register-button" onClick={handleSubmit}>
          Register
          </button>
        </div>

        {/* Display feedback message */}
        {message && (
          <div className={`feedback-message ${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
