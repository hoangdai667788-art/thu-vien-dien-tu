import React from 'react'

const footerStyle = {
  backgroundColor: '#2c3e50', // <-- Xanh Navy đậm
  color: '#bdc3c7', // <-- Chữ xám nhạt
  padding: '20px',
  textAlign: 'center',
  marginTop: 'auto'
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>© 2025 Thư Viện Điện Tử. Phát triển bởi [Hoàng Quốc Đại]</p>
    </footer>
  )
}
export default Footer