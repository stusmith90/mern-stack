const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const devTaskSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const devTask = mongoose.model('devTask', devTaskSchema);

module.exports = devTask;