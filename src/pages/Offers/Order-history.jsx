import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order-history.css';
import a from '../../EN';
function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Replace with your token storage method
        const response = await axios.get(`${a}/user/order-history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the response data is in the correct format
        if (response.data && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((order) => ({
            orderId: order._id,
            orderedBy: order.orderedby,
            items: order.items, // Use the items directly
            totalAmount: order.totalAmount,
            deliveryAddress: order.deliveryAddress,
            status: order.status,
            createdAt: order.createdAt,
          }));

          setOrderHistory(formattedData);
        } else {
          setOrderHistory([]); // Set empty array if the response format is unexpected
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
        setError('Failed to load order history. Please try again later.');
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Show error message if the API call fails
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orderHistory[0].orderId != null ? (
        <ul>
          {orderHistory.map((order) => (
            <li key={order.orderId}>
              <h3>Order ID: {order.orderId}</h3>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Delivery Address: {order.deliveryAddress}</p>
              <p>Status: {order.status}</p>
              <p>Ordered On: {new Date(order.createdAt).toLocaleString()}</p>

              <h4>Items:</h4>
              <ul>
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.quantity} x {item.foodDetails?.title || 'N/A'} (₹{item.foodDetails?.price || 'N/A'})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No order history found.</p>
      )}
    </div>
  );
}

export default OrderHistory;
