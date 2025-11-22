import React from 'react'

// CSS (Theme mới)
const searchBarContainer = {
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: '#ecf0f1' // <-- Nền Xám/Beige rất nhạt
};
const searchInput = {
  width: '50%',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #bdc3c7', // <-- Viền xám
  borderRadius: '4px 0 0 4px'
};
const searchButton = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#3498db', // <-- Màu Xanh dương (Blue)
  color: 'white',
  border: '1px solid #3498db',
  borderRadius: '0 4px 4px 0',
  cursor: 'pointer'
};

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div style={searchBarContainer}>
      <input 
        type="text" 
        style={searchInput} 
        placeholder="Tìm kiếm sách hoặc tác giả..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <button style={searchButton}>
        Tìm kiếm
      </button>
    </div>
  )
}
export default SearchBar