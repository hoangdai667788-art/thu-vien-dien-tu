const express = require('express');
const router = express.Router();
const Book = require('../models/Book.model.js');
const { protect, isAdmin } = require('../middleware/auth.middleware.js');

// GET ALL
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// GET ONE
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// CREATE (POST)
router.post('/', protect, isAdmin, async (req, res) => {
  try {
    const { title, author, filePath, isPremium, description, coverImagePath } = req.body;
    if (!title || !author || !filePath) return res.status(400).json({ message: 'Thiếu thông tin' });
    
    const newBook = new Book({ title, author, filePath, isPremium, description, coverImagePath });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// UPDATE (PUT) - API SỬA SÁCH
router.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const { title, author, description, isPremium } = req.body;
    const book = await Book.findById(req.params.id);
    
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });

    // Cập nhật dữ liệu
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.isPremium = isPremium; 

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi sửa sách' });
  }
});

// DELETE (DELETE) - API XÓA SÁCH
router.delete('/:id', protect, isAdmin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Không tìm thấy sách' });
    
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi xóa sách' });
  }
});

module.exports = router;