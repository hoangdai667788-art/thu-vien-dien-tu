import React, { useState, useEffect } from 'react'
import axios from 'axios'

// CSS
const container = { padding: '40px' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
const thStyle = { border: '1px solid #ddd', padding: '8px', backgroundColor: '#ecf0f1', textAlign: 'left' };
const tdStyle = { border: '1px solid #ddd', padding: '8px' };
const buttonStyle = { marginLeft: '10px', padding: '5px 10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [duration, setDuration] = useState('1-month');
  const [loading, setLoading] = useState(true); // Trạng thái đang tải

  const fetchUsers = async () => {
    try {
      // Gọi API lấy danh sách
      const response = await axios.get('https://thu-vien-dien-tu-backend.onrender.com//api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi API:", error);
      // Nếu lỗi 401/403, nghĩa là chưa đăng nhập hoặc không phải admin
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        alert("Phiên đăng nhập hết hạn hoặc không có quyền. Vui lòng đăng nhập lại!");
      }
    } finally {
      // QUAN TRỌNG: Luôn tắt trạng thái "Đang tải" dù thành công hay thất bại
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpgrade = async (userId) => {
    try {
      await axios.put(`https://thu-vien-dien-tu-backend.onrender.com//api/users/${userId}/upgrade`, { duration });
      alert('Nâng cấp thành công!');
      fetchUsers();
    } catch (error) {
      alert('Lỗi nâng cấp: ' + (error.response?.data?.message || 'Lỗi server'));
    }
  };

  // Giao diện
  if (loading) {
    return <div style={{padding: '40px'}}><h2>⏳ Đang kết nối đến Server...</h2></div>;
  }

  return (
    <div style={container}>
      <h2>Quản lý Người dùng</h2>
      
      {/* Kiểm tra nếu không có user nào */}
      {users.length === 0 ? (
        <p>Không tìm thấy người dùng nào (hoặc lỗi kết nối Backend).</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Vai trò</th>
              <th style={thStyle}>Gói</th>
              <th style={thStyle}>Hết hạn</th>
              <th style={thStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>{user.subscription}</td>
                <td style={tdStyle}>
                  {user.subscriptionExpiryDate 
                    ? new Date(user.subscriptionExpiryDate).toLocaleDateString('vi-VN') 
                    : 'N/A'}
                </td>
                <td style={tdStyle}>
                  {user.role !== 'admin' && (
                    <div>
                      <select onChange={(e) => setDuration(e.target.value)} value={duration}>
                        <option value="1-month">1 Tháng</option>
                        <option value="6-months">6 Tháng</option>
                        <option value="1-year">1 Năm</option>
                      </select>
                      <button style={buttonStyle} onClick={() => handleUpgrade(user._id)}>
                        Nâng cấp
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserManagementPage