import React, { useState, useEffect } from 'react' // <-- IMPORT useEffect
import axios from 'axios' // <-- IMPORT AXIOS
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
// KHÔNG CẦN IMPORT DUMMYBOOKS NỮA

// KHÔNG CÒN MẢNG DUMMYBOOKS Ở ĐÂY NỮA

function HomePage() {
  // 1. TẠO STATE ĐỂ LƯU SÁCH (Ban đầu là mảng rỗng)
  const [allBooks, setAllBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 2. SỬ DỤNG useEffect ĐỂ TẢI DỮ LIỆU
  // (Code trong đây sẽ chạy 1 lần duy nhất khi component được tải)
  useEffect(() => {
    // Định nghĩa hàm gọi API
    const fetchBooks = async () => {
      try {
        // Gọi đến API backend (axios)
        const response = await axios.get('http://localhost:4000/api/books');
        // Lưu sách vào state
        setAllBooks(response.data);
      } catch (error) {
        console.error('Lỗi khi tải sách:', error);
      }
    };

    fetchBooks(); // Gọi hàm
  }, []); // [] nghĩa là chỉ chạy 1 lần

  // 3. Lọc danh sách sách TỪ STATE (thay vì dummyBooks)
  const filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <div style={{ padding: '20px 40px' }}>
        <h2>Sách Mới Nhất</h2>

        {/* 4. Hiển thị sách đã lọc (từ state) */}
        <BookList books={filteredBooks} />
      </div>
    </div>
  )
}

export default HomePage