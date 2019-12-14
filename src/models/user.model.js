const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      max: 50 
    },
    email: {
      type: String,
      required: true,
      max: 255
    },
    password: {
      type: String,
      requirde: true,
      max: 1024,
      min: 6
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);