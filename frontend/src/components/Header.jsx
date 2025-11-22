import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// CSS cho Header (Theme mới)
const headerStyle = {
  backgroundColor: '#2c3e50', // <-- Xanh Navy đậm
  color: 'white', // <-- Chữ trắng
  padding: '20px 40px',
  borderBottom: '1px solid #34495e',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};
const logoStyle = { margin: 0, fontSize: '24px' };

// CSS cho các link (Đổi màu)
const navLinkStyle = {
  textDecoration: 'none',
  color: '#ecf0f1', // <-- Màu trắng nhạt
  fontWeight: 'bold',
  marginLeft: '20px',
  fontSize: '16px',
  cursor: 'pointer'
};
const logoLinkStyle = { textDecoration: 'none', color: 'inherit' };

function Header() {
  const { currentUser, logout } = useAuth(); 
  const handleLogout = () => { logout(); };

  return (
    <header style={headerStyle}>
      <Link to="/" style={logoLinkStyle}>
        <h2 style={logoStyle}>Thư Viện Điện Tử Học viện Chính trị Công an nhân dân</h2>
      </Link>
      <div>
        {currentUser ? (
          <>
            <span style={{ marginRight: '20px', fontSize: '16px', color: '#bdc3c7' }}> {/* Màu xám nhạt */}
              Xin chào, {currentUser.email}
            </span>
            <a onClick={handleLogout} style={navLinkStyle}>
              Đăng xuất
            </a>
          </>
        ) : (
          <>
            <Link to="/login" style={navLinkStyle}>
              Đăng nhập
            </Link>
            <Link to="/register" style={navLinkStyle}>
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
export default Header