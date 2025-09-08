import {Route, Routes, Navigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import ProductsPage from './ProductsPage';
import AdminOrdersPage from './AdminOrdersPage';
import CollectionsPage from './CollectionsPage';
import UsersPage from './UsersPage';

const Dashboard = () => {
  return(
    <div className="dashboard" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div className="dashboard-content" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>     
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard;
