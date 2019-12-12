const express = require('express');

exports.register = (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      message: 'this is still under construction'
    });
} 
