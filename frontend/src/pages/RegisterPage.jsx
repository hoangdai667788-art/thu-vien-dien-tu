import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// CSS STYLES
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px' };
const formStyle = { width: '400px', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' };
const inputStyle = { width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '12px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/register',
        { email: email, password: password }
      );
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message || 'Đăng ký thất bại.');
    }
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Đăng ký Tài khoản</h2>
        <label>Email</label>
        <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Mật khẩu</label>
        <input type="password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>Xác nhận Mật khẩu</label>
        <input type="password" style={inputStyle} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit" style={buttonStyle}>Đăng ký</button>
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage