const express = require('express');
const router = express.Router();
// Import cả 2 gác cổng upload
const { uploadFile, uploadCover } = require('../middleware/auth.middleware.js');

// === API 1: UPLOAD FILE SÁCH (PDF) ===
// (Đổi tên thành POST /api/upload/file)
router.post('/file', uploadFile, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file sách nào được tải lên.' });
  }
  res.status(200).json({
    message: 'Tải file sách thành công',
    filePath: `/uploads/${req.file.filename}` 
  });
});

// === API 2: UPLOAD ẢNH BÌA (IMAGE) (MỚI) ===
// (POST /api/upload/cover)
router.post('/cover', uploadCover, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Không có file ảnh nào được tải lên.' });
  }
  // Trả về đường dẫn của ảnh đã lưu
  res.status(200).json({
    message: 'Tải ảnh bìa thành công',
    coverPath: `/covers/${req.file.filename}` // Trả về 'coverPath'
  });
});

module.exports = router;