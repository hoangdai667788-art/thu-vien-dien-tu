import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext' 

// CSS STYLES
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' };
const formStyle = { width: '400px', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' };
const inputStyle = { width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '12px', fontSize: '16px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        'https://thu-vien-dien-tu-backend.onrender.com//api/auth/login',
        { email: email, password: password }
      );
      const { token, user } = response.data;
      login(token, user); 
      alert('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      alert(error.response.data.message || 'Đăng nhập thất bại.');
    }
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Đăng nhập</h2>
        <label>Email</label>
        <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Mật khẩu</label>
        <input type="password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" style={buttonStyle}>Đăng nhập</button>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage