import a from "../EN";
const BASE_URL = a;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
});

// Register user
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

    return data1;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Logout user

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Logout failed.");
    }

    localStorage.removeItem("accessToken");
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
