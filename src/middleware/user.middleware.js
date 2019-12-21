require("dotenv").config();
const jwt = require("jsonwebtoken");
const userValidations = require("../validations/user.validations");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

// Registro

/**
 * Funcion middleware que comprueba que el body del request coincida con las validaciones de Joi.
 * Llamar a esta función en el archivo user.router.js antes del middleware 'userController.register'
 */
exports.validateRegisterBody = (req, res, next) => {
  const validation = userValidations.register.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      status: "fail",
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
exports.isUserAlreadyRegistered = async (req, res, next) => {
  // Comprueba si el email ya existe | usuario ya registrado
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "email already exists"
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal error - Cannot check if email already exists"
    });
  }
  next();
};

/**
 * Función middleware que encripta la contraseña del usuario que recibo del body.
 * Usar después del middleware 'isUserAlreadyRegister' en el archivo user.router.js antes del
 * middleware 'userController.register'
 */
exports.encryptPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.encryptedPassword = await bcrypt.hash(req.body.password, salt);
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal error - Could not encrypt password."
    });
  }
  next();
};

// Login

/**
 * Función de middleware que comprueba que el body de una petición de login sea el correcto.
 */
exports.validateLoginBody = (req, res, next) => {
  const validation = userValidations.login.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      status: "fail",
      message: validation.error.details[0].message
    });
  }
  next();
};

/**
 * Función que comprueba que los datos proporcionados por el usuario (en este caso email) son los
 * correctos para llevar a cabo el logueo. Usar después de la función de middleware 'validateLoginBody'.
 */
exports.validateEmailInLogin = async (req, res, next) => {
  try {
    req.user = await userModel.findOne({ email: req.body.email });
    if (!req.user) {
      return res.status(400).json({
        status: "fail",
        message: "Ivalid email"
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message:
        "Internal error - Cannot check if there was an user with that email."
    });
  }
  next();
};

/**
 * Función que comprueba que los datos proporcionados por el usuario (en este caso password) son los
 * correctos para llevar a cabo el logueo. Usar después de la función de middleware 'validateLoginBody'.
 */
exports.validatePasswordInLogin = async (req, res, next) => {
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      req.user.password
    );
    if (!validPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Ivalid password"
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal error - Cannot compare between passwords"
    });
  }
  next();
};

// TOKEN

/**
 * Función middleware que se encarga de asegurarse de que el request tiene un token válido.
 * Autenticación mediante tokens.
 * Poner en las páginas que quiera que sean vistas solo por usuarios registrados.
 */
exports.validateToken = (req, res, next) => {
  const token = req.header(process.env.TOKEN_HEADER_NAME);
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Access denied"
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
  next();
};
