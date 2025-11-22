import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext' 

function BookDetailPage() {
  const { id } = useParams();
  const { currentUser } = useAuth(); 
  const [book, setBook] = useState(null); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/books/${id}`);
        setBook(response.data); 
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sách:', error);
      }
    };
    
    fetchBook();
  }, [id]); 

  // (CSS Styles - không thay đổi)
  const loginButtonStyle = { padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' };
  const readButtonStyle = { padding: '10px 20px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' };
  const upgradeButtonStyle = { padding: '10px 20px', fontSize: '16px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' };

  
  // ===== HÀM RENDER NÚT (ĐÃ SỬA LOGIC ADMIN) =====
  const renderReadButton = () => {
    if (!book) return null; 

    // 1. Nếu chưa đăng nhập (Guest)
    if (!currentUser) {
      return (
        <Link to="/login" style={loginButtonStyle}>
          Vui lòng đăng nhập để đọc
        </Link>
      );
    }
    
    // 2. Nếu là Admin -> Luôn cho phép đọc
    if (currentUser.role === 'admin') {
      return (
        <a 
          href={`http://localhost:4000${book.filePath}`} 
          target="_blank"
          rel="noopener noreferrer"
          style={readButtonStyle}
        >
          Đọc Ngay (Quyền Admin)
        </a>
      );
    }

    // 3. Nếu sách là Premium VÀ user là 'free'
    if (book.isPremium && currentUser.subscription === 'free') {
      return (
        <Link to="/upgrade" style={upgradeButtonStyle}>
          Nâng cấp lên Premium để đọc
        </Link>
      );
    }

    // 4. Các trường hợp còn lại (Sách Free, hoặc User là Premium)
    return (
      <a 
        href={`http://localhost:4000${book.filePath}`} 
        target="_blank"
        rel="noopener noreferrer"
        style={readButtonStyle}
      >
        Đọc Ngay
      </a>
    );
  };
  // =============================================

  if (!book) {
    return <div style={{ padding: '40px' }}><h1>Đang tải...</h1></div>
  }

  // (Return JSX - không thay đổi)
  return (
    <div style={{ padding: '40px' }}>
      <h1>{book.title}</h1>
      <h3 style={{ color: '#555' }}>Tác giả: {book.author}</h3>
      {book.isPremium && <span style={{backgroundColor: '#ffc107', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold'}}>Premium</span>}
      
      <div style={{ display: 'flex', marginTop: '30px' }}>
        <div style={{ width: '300px', height: '400px', backgroundColor: '#eee', marginRight: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          [Ảnh bìa]
        </div>
        <div style={{ flex: 1 }}>
          <h2>Mô tả</h2>
          <p>Đây là nội dung mô tả chi tiết cho cuốn sách "{book.title}".</p>
          {renderReadButton()}
        </div>
      </div>
    </div>
  )
}

export default BookDetailPage