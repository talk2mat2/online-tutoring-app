const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema(
  {
    name: { type: String, required: true },
    Description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
