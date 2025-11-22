import React from 'react'
import { Link } from 'react-router-dom' 

// ... (Toàn bộ CSS style của bạn vẫn giữ nguyên) ...
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  width: '200px',
  margin: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};
const imageStyle = {
  width: '100%',
  height: '200px',
  backgroundColor: '#eee',
  borderRadius: '4px'
};
const titleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginTop: '10px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
};
const authorStyle = {
  fontSize: '14px',
  color: '#555',
  marginTop: '5px'
};
const linkStyle = {
  textDecoration: 'none',
  color: 'inherit'
};
// ===================================

function BookCard({ book }) {
  return (
    // SỬA LỖI: Dùng 'book._id' (từ MongoDB) cho đường dẫn
    <Link to={`/book/${book._id}`} style={linkStyle}>
      <div style={cardStyle}>
        <div style={imageStyle}>
           {/* (Chúng ta sẽ thêm ảnh thật sau) */}
        </div>
        <h3 style={titleStyle}>{book.title}</h3>
        <p style={authorStyle}>{book.author}</p>
      </div>
    </Link>
  )
}

export default BookCard