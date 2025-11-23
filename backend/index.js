require('dotenv').config(); // <-- 1. THÊM DÒNG NÀY Ở ĐẦU
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); 

const authRoutes = require('./routes/auth.route.js');
const bookRoutes = require('./routes/book.route.js');
const uploadRoutes = require('./routes/upload.route.js');
const usersRoutes = require('./routes/users.route.js'); 

const app = express();
app.use(cors());
app.use(express.json());

// 2. DÙNG BIẾN TỪ .ENV
const PORT = process.env.PORT || 4000; 
const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('Đã kết nối thành công với MongoDB Atlas!')) // Đổi thông báo
  .catch((error) => console.error('Lỗi kết nối MongoDB:', error));
  
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); 
app.use('/api/upload', uploadRoutes);
app.use('/api/users', usersRoutes); 

app.get('/', (req, res) => {
  res.json({ message: 'Xin chào! Đây là Backend Thư viện Điện tử.' });
});

app.listen(PORT, () => {
  console.log(`Server Backend đang chạy tại http://localhost:${PORT}`);
});
// Cap nhat deploy 