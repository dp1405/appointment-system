const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: Date,
  start_time: String,
  end_time: String,
  is_booked: Boolean,
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Slot', slotSchema);