const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: { type: String, required: true },
  biography: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
  });


const Author = mongoose.model('Author',AuthorSchema)

module.exports = Author