require('dotenv').config();
const jwt = require('jsonwebtoken');
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
 * Función que loguea a un usuario dandole un token.
 * Por seguridad es necesario pasar por middlewares del archivo 'user.middleware.js' primero.
 * Estos middlewares son usados en el archivo 'user.rutes.js'.
 */
exports.login = (req, res) => {
  const token = jwt.sign({_id: req.user._id}, process.env.TOKEN_SECRET);
  res.header(process.env.TOKEN_HEADER_NAME, token).status(200).json({
    status: "success",
    message: "Logged in!",
    token: token
  });
}