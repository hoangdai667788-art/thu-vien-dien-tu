import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const container = { padding: '40px' };
const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', fontSize: '16px' };
const buttonStyle = { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' };

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Thử gọi API
        const response = await axios.get(`http://localhost:4000/api/books/${id}`);
        // Nếu thành công, điền dữ liệu
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi tải sách:", error);
        alert("Không tìm thấy sách này!");
        navigate('/admin'); // Đá về trang Admin nếu lỗi
      }
    };
    if (id) fetchBook();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/books/${id}`, { title, author });
      alert('Cập nhật thành công!');
      navigate('/admin');
    } catch (error) {
      alert('Lỗi cập nhật: ' + (error.response?.data?.message || 'Lỗi server'));
    }
  };

  if (loading) return <div style={container}><h2>Đang tải...</h2></div>;

  return (
    <div style={container}>
      <h2>Sửa thông tin sách</h2>
      <form onSubmit={handleUpdate} style={{maxWidth: '500px'}}>
        <label>Tiêu đề:</label>
        <input type="text" style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} required />
        
        <label>Tác giả:</label>
        <input type="text" style={inputStyle} value={author} onChange={(e) => setAuthor(e.target.value)} required />
        
        <button type="submit" style={buttonStyle}>Lưu thay đổi</button>
      </form>
    </div>
  )
}

export default EditBookPage