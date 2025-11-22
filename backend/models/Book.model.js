const mongoose = require('mongoose');

// Đây là "bản thiết kế" cho Sách
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'Chưa có mô tả cho cuốn sách này.' // Mô tả mặc định
  },
  coverImagePath: { // Đường dẫn đến ảnh bìa
    type: String,
    default: ''
  },
  filePath: { // Đường dẫn đến file sách (PDF, EPUB)
    type: String,
    required: true
  },
  isPremium: { // Đánh dấu sách premium
    type: Boolean,
    default: false // Mặc định là sách 'free'
  }
}, {
  timestamps: true // Tự động thêm dấu thời gian
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;