// File: backend/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.model.js');

// CẤU HÌNH TÀI KHOẢN ADMIN BẠN MUỐN TẠO
const ADMIN_EMAIL = "superadmin@gmail.com";
const ADMIN_PASSWORD = "admin123"; // Mật khẩu dễ nhớ

const createAdmin = async () => {
  try {
    // 1. Kết nối Database
    await mongoose.connect('mongodb://localhost:27017/thuviendientu');
    console.log('--- Đã kết nối MongoDB ---');

    // 2. Kiểm tra xem đã có chưa
    const existingUser = await User.findOne({ email: ADMIN_EMAIL });
    if (existingUser) {
      console.log(`⚠️ Tài khoản ${ADMIN_EMAIL} đã tồn tại!`);
      // Nếu đã tồn tại nhưng chưa là admin, ta ép nó thành admin
      existingUser.role = 'admin';
      existingUser.subscription = 'premium';
      await existingUser.save();
      console.log('-> Đã cập nhật lại quyền Admin cho tài khoản này.');
      process.exit();
    }

    // 3. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // 4. Tạo User mới với quyền cao nhất
    const adminUser = new User({
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',           // <--- QUAN TRỌNG NHẤT
      subscription: 'premium', // Cho luôn gói Premium vĩnh viễn
      subscriptionExpiryDate: null // Không bao giờ hết hạn
    });

    await adminUser.save();
    console.log('✅ TẠO SUPER ADMIN THÀNH CÔNG!');
    console.log(`👉 Email: ${ADMIN_EMAIL}`);
    console.log(`👉 Pass : ${ADMIN_PASSWORD}`);

  } catch (error) {
    console.error('Lỗi:', error);
  } finally {
    // Ngắt kết nối
    mongoose.disconnect();
  }
};

createAdmin();