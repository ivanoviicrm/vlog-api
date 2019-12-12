const express = require('express');

exports.getAllPost = (req, res) => {
  res
    .status(200) 
    .json({
      status: 'success',
      message: 'this is still under construction'  
    });
}
