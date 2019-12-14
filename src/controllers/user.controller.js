const mongoose = require('mongoose'); // Sin mongoose falla
const userModel = require('../models/user.model');

/**
 * Función que guarda un usuario en la DB.
 * Por seguridad es necesario pasar por middlewares del archivo 'user.middleware.js' primero.
 * Estos middlewares son usados en el archivo 'user.rutes.js'.
 */
exports.register =  async (req, res) => {
  const encryptedPassword = req.encryptedPassword;

  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword
  });

  if (await user.save()) {
    res.status(200).json({
      status: 'success',
      message: `user ${req.body.name} was created`
    });
  }
} 

/**
 * Función que loguea a un usuario.
 * En construcción...
 */
exports.login = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'this is still under construction'
  });
}