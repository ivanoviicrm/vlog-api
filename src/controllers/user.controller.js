const mongoose = require('mongoose'); // Sin mongoose falla
const userValidations = require('../validations/user.validations');
const userModel = require('../models/user.model');

exports.register =  async (req, res) => {
  // Validación del body
  const validation = userValidations.register.validate(req.body)
  if (validation.error) {
    return res.status(400).json({
      status: 'fail',
      message: validation.error.details[0].message
    });
  }

  // Comprueba si el email ya existe | usuario ya registrado
  if(await userModel.findOne({ email: req.body.email })) {
    return res.status(400).json({
      status: 'fail',
      message: 'email already exists'
    });
  }

  // Crea el modelo a guardar en la DB.
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // Guarda el usuario en la DB
  const userSaved = await user.save();
  if (userSaved) {
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