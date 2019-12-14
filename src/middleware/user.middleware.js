const userValidations = require('../validations/user.validations');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

/**
 * Funcion middleware que comprueba que el body del request coincida con las validaciones de Joi.
 * Llamar a esta función en el archivo user.router.js antes del middleware 'userController.register'
 */
exports.validateRegisterBody = (req, res, next) => {
  const validation = userValidations.register.validate(req.body)
  if (validation.error) {
    return res.status(400).json({
      status: 'fail',
      message: validation.error.details[0].message
    });
  }
  next();
};

/**
 * Función middleware que comprueba que el email (que me pasan en el body) no existe ya en la DB.
 * Usar después del middleware 'validateRegisterBody' en el archivo user.router.js antes del
 * middleware 'userController.register'
 */
exports.isUserAlreadyRegister = async (req, res, next) => {
  // Comprueba si el email ya existe | usuario ya registrado
  if(await userModel.findOne({ email: req.body.email })) {
    return res.status(400).json({
      status: 'fail',
      message: 'email already exists'
    });
  }
  next();
}

/**
 * Función middleware que encripta la contraseña del usuario que recibo del body.
 * Usar después del middleware 'isUserAlreadyRegister' en el archivo user.router.js antes del
 * middleware 'userController.register'
 */
exports.encryptPassword = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  req.encryptedPassword = await bcrypt.hash(req.body.password, salt);
  next();
}