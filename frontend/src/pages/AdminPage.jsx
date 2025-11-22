import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// (CSS - không đổi)
const formContainer = { padding: '40px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', marginBottom: '40px' };
const inputStyle = { padding: '10px', fontSize: '16px' };
const buttonStyle = { padding: '10px', fontSize: '16px', backgroundColor: '#3498db', color: 'white', border: 'none', cursor: 'pointer' };
const uploadSuccessStyle = { color: 'green', fontWeight: 'bold' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
const thStyle = { border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' };
const tdStyle = { border: '1px solid #ddd', padding: '8px' };
const editLinkStyle = { color: 'blue', marginRight: '10px' };
const deleteButtonStyle = { color: 'red', cursor: 'pointer', background: 'none', border: 'none', padding: 0 };


function AdminPage() {
  // (State - không đổi)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [filePath, setFilePath] = useState(''); 
  const [uploadingFile, setUploadingFile] = useState(false);
  const [coverImagePath, setCoverImagePath] = useState(''); 
  const [uploadingCover, setUploadingCover] = useState(false);
  const [books, setBooks] = useState([]); 
  
  // (Các hàm logic - không đổi)
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/books');
      setBooks(response.data);
    } catch (error) { console.error('Lỗi khi tải danh sách sách:', error); }
  };
  useEffect(() => { fetchBooks(); }, []);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setUploadingFile(true);
    const formData = new FormData();
    formData.append('file', selectedFile); 
    try {
      const response = await axios.post('http://localhost:4000/api/upload/file', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setFilePath(response.data.filePath); 
      alert('Tải file sách thành công!');
    } catch (error) {
      alert('Lỗi khi tải file sách: ' + (error.response?.data?.message || 'Lỗi server'));
    } finally {
      setUploadingFile(false);
    }
  };

  const handleCoverImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setUploadingCover(true);
    const formData = new FormData();
    formData.append('cover', selectedFile); 
    try {
      const response = await axios.post('http://localhost:4000/api/upload/cover', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setCoverImagePath(response.data.coverPath); 
      alert('Tải ảnh bìa thành công!');
    } catch (error) {
      alert('Lỗi khi tải ảnh bìa: ' + (error.response?.data?.message || 'Lỗi server'));
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!filePath || !coverImagePath) { 
      alert('Vui lòng tải lên cả File sách và Ảnh bìa!');
      return;
    }
    const newBook = { title, author, filePath, isPremium, coverImagePath }; 
    try {
      await axios.post('http://localhost:4000/api/books', newBook);
      alert('Thêm sách thành công!');
      fetchBooks(); 
      setTitle(''); setAuthor(''); setFilePath(''); setCoverImagePath(''); setIsPremium(false);
      document.getElementById('fileInput').value = null;
      document.getElementById('coverInput').value = null; 
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || 'Không thể thêm sách'));
    }
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      try {
        await axios.delete(`http://localhost:4000/api/books/${bookId}`);
        alert('Xóa sách thành công!');
        fetchBooks(); 
      } catch (error) {
        alert('Lỗi khi xóa sách: ' + (error.response?.data?.message || 'Lỗi server'));
      }
    }
  };

  // === PHẦN 4: GIAO DIỆN (Đã sửa lỗi cú pháp Bảng) ===
  const isUploading = uploadingFile || uploadingCover;
  return (
    <div style={formContainer}>
      {/* (Form Thêm sách - không đổi) */}
      <h2>Bảng điều khiển Admin - Thêm sách mới</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        {/* ... (Code Form như cũ) ... */}
        <label>Tiêu đề sách:</label>
        <input type="text" style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Tác giả:</label>
        <input type="text" style={inputStyle} value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <label>Tải ảnh bìa (JPG/PNG):</label>
        <input type="file" onChange={handleCoverImageChange} required id="coverInput" accept="image/*" />
        {uploadingCover && <p>Đang tải ảnh bìa...</p>}
        {coverImagePath && <p style={uploadSuccessStyle}>Đã tải ảnh: {coverImagePath}</p>}
        <label>Tải file sách (PDF/EPUB):</label>
        <input type="file" onChange={handleFileChange} required id="fileInput" /> 
        {uploadingFile && <p>Đang tải file sách...</p>}
        {filePath && <p style={uploadSuccessStyle}>Đã tải sách: {filePath}</p>}
        <div>
          <input type="checkbox" checked={isPremium} onChange={(e) => setIsPremium(e.target.checked)} id="isPremiumCheck" />
          <label htmlFor="isPremiumCheck" style={{marginLeft: '10px'}}>Đây là sách Premium?</label>
        </div>
        <button type="submit" style={buttonStyle} disabled={isUploading}>
          {isUploading ? 'Đang xử lý file...' : 'Thêm sách'}
        </button>
      </form>

      <hr />

      {/* BẢNG DANH SÁCH SÁCH (Đã sửa lỗi cú pháp) */}
      <h2>Quản lý Sách Hiện có</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Tiêu đề</th>
            <th style={thStyle}>Tác giả</th>
            {/* SỬA LỖI 1: Thiếu dấu {} */}
            <th style={thStyle}>Trạng thái</th>
            <th style={thStyle}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td style={tdStyle}>{book.title}</td>
              {/* SỬA LỖI 2: Thiếu dấu = */}
              <td style={tdStyle}>{book.author}</td>
              <td style={tdStyle}>{book.isPremium ? 'Premium' : 'Free'}</td>
              <td style={tdStyle}>
                <Link to={`/admin/edit/${book._id}`} style={editLinkStyle}>
                  Sửa
                </Link>
                <button onClick={() => handleDelete(book._id)} style={deleteButtonStyle}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPage