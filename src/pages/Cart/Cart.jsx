import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/Storecontext";
import axios from "axios";
import a from "../../EN";
const Cart = () => {
  const { cartit, food_list, addtocart, remfromcart, clearCart } = useContext(StoreContext);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const getFoodItem = (_id) => food_list.find((item) => item._id === _id) || null;

  const calculateTotalPrice = () => {
    let subtotal = 0, totalGST = 0;
    Object.keys(cartit).forEach((_id) => {
      const foodItem = getFoodItem(_id);
      if (foodItem) {
        const itemTotal = foodItem.price * cartit[_id];
        subtotal += itemTotal;
        totalGST += itemTotal * 0.05;
      }
    });
    return {
      subtotal: subtotal.toFixed(2),
      totalGST: totalGST.toFixed(2),
      totalWithGST: (subtotal + totalGST).toFixed(2),
    };
  };

  const { subtotal, totalGST, totalWithGST } = calculateTotalPrice();

  const handleCheckout = async () => {
    try {
      if (!razorpayLoaded) {
        alert("Razorpay is still loading. Please wait.");
        return;
      }

      const items = Object.keys(cartit).map((_id) => ({
        item: _id,
        quantity: cartit[_id],
      }));
      const deliveryAddress = "Hello World";
      const totalAmount = parseFloat(totalWithGST);

      if (isNaN(totalAmount) || totalAmount <= 0) {
        alert("Invalid total amount. Please check your cart.");
        return;
      }

      const { data } = await axios.post(
        `${a}/order/placeorder`,
        { items, deliveryAddress, totalAmount },
        { withCredentials: true }
      );

      const { razorpayOrder } = data;

      const options = {
        key: "rzp_test_47XhLts7Ku9hbU",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "My Restaurant",
        description: "Food Order Payment",
        order_id: razorpayOrder.id,
        handler: function () {
          alert("Payment Successful! order will be delivered soon");
          clearCart();
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert("Order creation failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-7xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b-2 pb-4">
        Your Cart
      </h2>

      <ul className="space-y-6">
        {Object.keys(cartit).length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty</p>
        ) : (
          Object.keys(cartit).map((_id) => {
            const foodItem = getFoodItem(_id);
            if (!foodItem) return null;

            return (
              <li key={_id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{foodItem.title}</h4>
                  <p className="text-sm text-gray-500">Quantity: {cartit[_id]}</p>
                  <p className="text-base font-medium text-gray-700">Subtotal: ₹{(foodItem.price * cartit[_id]).toFixed(2)}</p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600" onClick={() => addtocart(_id)}>Add More</button>
                  <button className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600" onClick={() => remfromcart(_id)} disabled={cartit[_id] <= 1}>Remove One</button>
                  <button className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700" onClick={() => { cartit[_id] = 1; remfromcart(_id); }}>Remove Item</button>
                </div>
              </li>
            );
          })
        )}
      </ul>

      {Object.keys(cartit).length > 0 && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 border-t-2 pt-4">Subtotal: ₹{subtotal}</h3>
          <h3 className="text-xl font-semibold text-gray-800">GST (5%): ₹{totalGST}</h3>
          <h3 className="text-2xl font-bold text-green-500 mt-2">Total with GST: ₹{totalWithGST}</h3>
          <button className="bg-yellow-500 text-white py-3 px-10 rounded-full text-lg font-semibold shadow-lg hover:bg-yellow-600 mt-6" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
