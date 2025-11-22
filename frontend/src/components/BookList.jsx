import React from 'react'
import BookCard from './BookCard' // Import thẻ sách

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap', // Cho phép các thẻ tự xuống hàng
  justifyContent: 'center', // Căn giữa các thẻ
  padding: '20px 0'
};

function BookList({ books }) {
  return (
    <div style={listStyle}>
      {/* SỬA LỖI: Dùng 'book._id' (từ MongoDB) làm 'key'
      */}
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  )
}

export default BookList