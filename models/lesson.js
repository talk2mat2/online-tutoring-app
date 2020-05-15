const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema(
  {
    title: {
      type: String,

      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subject',
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tutor',
    },
    time: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('lesson', lessonSchema);
