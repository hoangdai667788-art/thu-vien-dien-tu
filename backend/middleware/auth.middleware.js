const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const multer = require('multer');

// --- GÁC CỔNG 1: PROTECT ---
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Lấy user từ DB
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'User không tồn tại' });
      }

      // Logic tự động hạ cấp (nếu hết hạn)
      if (user.subscription === 'premium' && user.subscriptionExpiryDate && user.subscriptionExpiryDate < new Date()) {
         user.subscription = 'free';
         user.subscriptionExpiryDate = null;
         await user.save();
      }

      req.user = user;
      next(); 

    } catch (error) {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Chưa đăng nhập (Thiếu Token)' });
  }
};

// --- GÁC CỔNG 2: ADMIN ---
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Không có quyền Admin' });
  }
};

// --- UPLOAD ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'public/uploads'); },
  filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage: storage }).single('file');

const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'public/covers'); },
  filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname); }
});
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) { cb(null, true); } 
  else { cb(new Error('Chỉ chấp nhận ảnh!'), false); }
};
const uploadCover = multer({ storage: coverStorage, fileFilter: imageFilter }).single('cover');

module.exports = { protect, isAdmin, upload, uploadFile: upload, uploadCover };