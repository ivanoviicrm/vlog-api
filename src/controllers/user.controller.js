const mongoose = require('mongoose'); // Sin mongoose falla
const userModel = require('../models/user.model');

exports.register =  async (req, res) => {
  // Crea el modelo a guardar en la DB.
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // Guarda el usuario en la DB
  if (await user.save()) {
    res.status(200).json({
      status: 'success',
      message: `user ${req.body.name} was created`
    });
  }
} 

exports.login = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'this is still under construction'
  });
}