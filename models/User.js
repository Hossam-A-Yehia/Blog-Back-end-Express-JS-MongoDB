const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, },
  about: { type: String, require: false, },
  profilePic: { type: String, default: "noOne.png" },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)