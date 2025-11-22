const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  subscription: {
    type: String,
    default: 'free'
  }, 
  role: {
    type: String,
    default: 'user'
  },
  subscriptionExpiryDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;