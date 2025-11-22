import React from 'react'
import Header from './Header' // Import Header
import Footer from './Footer' // Import Footer

// { children } là một prop đặc biệt, nó đại diện cho
// bất cứ thứ gì được bọc bên trong <Layout> (ví dụ: HomePage)
function Layout({ children }) {

  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh' // Đảm bảo layout cao ít nhất bằng màn hình
  };

  const mainStyle = {
    flex: 1 // Quan trọng: Giúp phần nội dung co giãn
  };

  return (
    <div style={layoutStyle}>
      <Header />
      <main style={mainStyle}>
        {children} {/* Đây là nơi nội dung trang (HomePage) sẽ hiển thị */}
      </main>
      <Footer />
    </div>
  )
}

export default Layout