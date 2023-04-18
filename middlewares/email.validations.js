const { body, validationResult } = require("express-validator");
const User = require("../models/users.model");
const { error400 } = require("../helpers/resp");

const validateEmailExistence = [
  body("email")
    .isEmail()
    .withMessage("Ingrese un correo electrónico válido.")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Este usuario ya existe");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error400(res, errors.array());
    }
    next();
  },
];

/**
 * Middleware que valida si la cédula ya se encuentra registrada en la base de datos.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {Function} next - Función callback que se ejecuta después de que se verifica la cédula.
 * @returns {Promise<void>}
 */
const valCedula = async (req, res, next) => {
  const { cedula } = req.body;
  const paciente = await User.find({ cedula: cedula });
  if (paciente.length >= 1) {
    return error400(res, "Este usuario ya existe");
  }
  next();
};

module.exports = { validateEmailExistence, valCedula };
