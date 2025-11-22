import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

// Component này sẽ "bọc" các trang Admin
function AdminRoute() {
  const { currentUser } = useAuth();

  // 1. Kiểm tra xem user đã đăng nhập VÀ có phải là 'admin' không
  const isAdmin = currentUser && currentUser.role === 'admin';

  // 2. Nếu là Admin, cho phép truy cập (hiển thị <Outlet />)
  // <Outlet /> là một "cửa", nó đại diện cho trang con (ví dụ: AdminPage)
  if (isAdmin) {
    return <Outlet />;
  }
  
  // 3. Nếu không phải Admin, "đá" (Navigate) họ về trang chủ ('/')
  return <Navigate to="/" replace />;
}

export default AdminRoute