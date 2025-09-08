import {useState,useEffect} from "react";
import orderApi from "../api/orderApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getAllOrders();
        setOrders(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order._id.includes(search) ||
      order.user?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? order.status?.toLowerCase() === statusFilter.toLowerCase() : true;

    return matchesSearch && matchesStatus;
  });

   return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Order Management</h2>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search by Order ID, User Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.5rem', flex: '1' }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Placed On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.email || 'N/A'}</td>
                <td>{order.status}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>{order.paymentMethod || 'N/A'}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <Link to={`/admin/order/${order._id}`}>
                    <button>View Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrdersPage;