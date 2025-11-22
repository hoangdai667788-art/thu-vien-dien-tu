const express = require('express');
const router = express.Router();
const User = require('../models/User.model.js');
const { protect, isAdmin } = require('../middleware/auth.middleware.js');

// 1. BẬT LẠI BẢO VỆ (Xóa dấu //)
router.use(protect, isAdmin);

// 2. API LẤY DANH SÁCH (Dữ liệu thật)
router.get('/', async (req, res) => {
  try {
    // Lấy từ Database thật
    const users = await User.find({}).select('-password'); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách' });
  }
});

// 3. API NÂNG CẤP (Như cũ)
router.put('/:id/upgrade', async (req, res) => {
  try {
    const { duration } = req.body; 
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }

    let expiryDate = new Date();
    if (duration === '1-month') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (duration === '6-months') {
      expiryDate.setMonth(expiryDate.getMonth() + 6);
    } else if (duration === '1-year') {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      return res.status(400).json({ message: 'Thời hạn không hợp lệ' });
    }

    user.subscription = 'premium';
    user.subscriptionExpiryDate = expiryDate;
    
    await user.save();
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi nâng cấp' });
  }
});

module.exports = router;