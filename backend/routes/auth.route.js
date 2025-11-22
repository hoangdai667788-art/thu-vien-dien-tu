const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User.model.js');

// === API ĐĂNG KÝ (Như cũ) ===
router.post('/register', async (req, res) => {
  // ... (Không thay đổi)
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã được sử dụng.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email: email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ 
      message: 'Đăng ký thành công!',
      user: { id: newUser._id, email: newUser.email } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// ===== API ĐĂNG NHẬP (ĐÃ SỬA LỖI HẾT HẠN) =====
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Tìm user
    // (Dùng 'let' thay vì 'const' để chúng ta có thể thay đổi nó)
    let user = await User.findOne({ email: email }); 
    if (!user) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }

    // 2. LOGIC TỰ ĐỘNG HẠ CẤP (ĐÃ DI CHUYỂN VỀ ĐÂY)
    // Kiểm tra xem user có phải là premium VÀ đã hết hạn chưa
    if (user.subscription === 'premium' && user.subscriptionExpiryDate && user.subscriptionExpiryDate < new Date()) {
      console.log(`Tài khoản ${user.email} hết hạn KHI ĐĂNG NHẬP. Đang hạ cấp...`);
      
      // Cập nhật user trong DB
      user.subscription = 'free';
      user.subscriptionExpiryDate = null;
      await user.save();
      
      // Biến 'user' bây giờ đã giữ thông tin đã bị hạ cấp
    }

    // 3. TẠO "VÉ" (TOKEN)
    // (Sẽ dùng thông tin 'user' đã được cập nhật)
    const token = jwt.sign(
  { id: user._id, subscription: user.subscription, role: user.role }, 
  process.env.JWT_SECRET, // <-- Sửa ở đây
  { expiresIn: '1h' }
);

    // 4. Trả về USER
    // (Sẽ gửi thông tin 'user' đã được cập nhật)
    res.status(200).json({
      message: 'Đăng nhập thành công!',
      token: token,
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription, // <-- Sẽ là 'free' nếu vừa bị hạ cấp
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;