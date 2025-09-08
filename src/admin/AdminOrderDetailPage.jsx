import orderApi from "../api/orderApi";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  const fetchOrder = async () => {
    try {
      const res = await orderApi.getOrderById(id);
      setOrder(res.data);
      setStatus(res.data.status); 
      console.log("Fetching order ID:", id);
    } catch (err) {
      setError('Failed to fetch order'); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async () => {  
    try {
      await orderApi.updateOrderStatus(id, status);
      alert('Order status updated successfully');
      fetchOrder(); // Optionally refresh the data
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update status');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Order Details (Admin)</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      <p><strong>Placed on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button onClick={handleStatusUpdate}>Update</button>
      </div>

      <h3>Items:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.product.name} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrderDetailPage;