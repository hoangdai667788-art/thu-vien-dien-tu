import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Import tất cả các trang
import HomePage from './pages/HomePage'
import BookDetailPage from './pages/BookDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage'
import UserManagementPage from './pages/UserManagementPage'
import EditBookPage from './pages/EditBookPage' // <-- 1. QUAN TRỌNG: IMPORT FILE NÀY
import AdminRoute from './components/AdminRoute' 

function App() {
  return (
    <Layout>
      <Routes>
        {/* === TUYẾN ĐƯỜNG CÔNG KHAI === */}
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* === TUYẾN ĐƯỜNG ADMIN (ĐÃ BẢO VỆ) === */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          
          {/* 2. QUAN TRỌNG: TUYẾN ĐƯỜNG SỬA SÁCH */}
          <Route path="/admin/edit/:id" element={<EditBookPage />} />
        </Route>
        
      </Routes>
    </Layout>
  )
}

export default App;