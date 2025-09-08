import {Routes, Route, Navigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import AccountSettings from './AccountSettings';
import OrderHistory from './OrderHistory';
import DashboardHome from './DashboardHome';
import WishList from './WishList';

const UserDashboard = () => {
  return(
    <div className="dashboard" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div className="dashboard-content" style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="accountSettings" element={<AccountSettings />} />
          <Route path="orderHistory" element={<OrderHistory />} />
          <Route path="wishList" element={<WishList />} />          
          <Route path="*" element={<Navigate to="/userDashboard" />} />
        </Routes>
      </div>
    </div>
  )
}

export default UserDashboard;