const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,

      required: true,
    },
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,

      required: true,
    },
    userRole: {
      type: String,
      required: true,
      enum: ['student', 'tutor', 'admin'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
