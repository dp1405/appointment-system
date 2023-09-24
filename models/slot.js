const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: Date,
  start_time: String,
  end_time: String,
  is_booked: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('Slot', slotSchema);