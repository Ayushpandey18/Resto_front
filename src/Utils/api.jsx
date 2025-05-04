import a from "../EN";
const BASE_URL = a;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
});


const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);  // Set expiration date (in days)
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
};
export const registerUser = async (registrationData) => {
  try {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      throw new Error("Failed to register user.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(loginData),
       withCredentials: true,
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Failed to login.");
    }

    const data1 = await response.json();
    console.log(data1);

    // Save tokens to localStorage
    localStorage.setItem("accessToken", data1.data.accessToken);
    localStorage.setItem("refreshToken", data1.data.refreshToken);

    // Set cookies for accessToken and refreshToken
    setCookie("accessToken", data1.data.accessToken, 10);  // 10 days
    setCookie("refreshToken", data1.data.refreshToken, 10); // 10 days
    return data1;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Logout user
const removeCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
};
export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Logout failed.");
    }
    removeCookie("accessToken");
    removeCookie("refreshToken");

    localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    return await response.json();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Example to fetch user's order history
export const getOrderHistory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/order-history`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order history.");
    }

    return await response.json();
  } catch (error) {
    console.error("Order history fetch error:", error);
    throw error;
  }
};
