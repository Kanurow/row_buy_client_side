import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Footer from '../layout/Footer';

const OrderRow = ({ order }) => (
  <tr key={order.id}>
    <td>{order.id}</td>
    <td>{order.firstName}  {order.lastName}</td>
    <td>{order.phoneNumber}</td>
    <td>{order.deliveryAddress}</td>
    <td>{`${order.region}, ${order.state}`}</td>
    <td>
      {order.cart.map((item) => (
        <div key={item.productId}>
          <div>{`${item.productName}: ${item.price} * ${item.quantity} = ${item.subtotal}`}</div>
        </div>
      ))}
    </td>
  </tr>
);

const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`https://jumia-clone-rowland.onrender.com/api/products/orderHistory/${user.id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setOrders(response.data);
        console.log(response.data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchUserOrders();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error Occured: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Order History</h1>
      <Table striped bordered hover>
        <thead className="bg-primary text-white">
          <tr>
            <th>Order ID</th>
            <th>Full Name</th>
            <th>Receiver Phone Number</th>
            <th>Delivery Address</th>
            <th>Region, State</th>
            <th>Cart Items : Price * Quantity = Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </Table>
      <Footer />
    </div>
  );
};

export default OrderHistory;

