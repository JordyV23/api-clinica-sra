const jwt = require("jsonwebtoken");
const { body, param } = require("express-validator");
const { error400, error500 } = require("../helpers/resp");
const Usuario = require("../models/users.model");

/**
 * Valida que el usuario autenticado sea un enfermero y llama al siguiente middleware si pasa la validación. Si no se proporciona un token de usuario válido o si el usuario no es un enfermero, se devuelve un error 400.
 * @async
 * @param {Object} req - Objeto de solicitud de Express que contiene el token de usuario para validar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función de middleware de Express para pasar al siguiente middleware si la validación es exitosa.
 * @returns {Object} - Devuelve la respuesta HTTP con un error 400 si la validación falla o llama al siguiente middleware si la validación es exitosa.
 * @throws {Error} - Si ocurre algún error durante la validación.
 */
const validateEnfermero = async (req = request, res = response, next) => {
  try {
    const token = req.header("user-token");
    if (!token) {
      return error400(res, "Debe autenticarse");
    }
    const { payload } = jwt.decode(token, { complete: true });
    const user = await Usuario.findById(payload.id);
    if (!(user.rol === "Enfermero")) {
      return error400(res, "El usuario no cuenta con los permisos necesarios");
    }
  } catch (err) {
    console.log(err);
    return error500(res);
  }
  next();
};

/**
 * Valida que el usuario autenticado sea un médico y llama al siguiente middleware si pasa la validación. Si no se proporciona un token de usuario válido o si el usuario no es un médico, se devuelve un error 400.
 * @async
 * @param {Object} req - Objeto de solicitud de Express que contiene el token de usuario para validar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función de middleware de Express para pasar al siguiente middleware si la validación es exitosa.
 * @returns {Object} - Devuelve la respuesta HTTP con un error 400 si la validación falla o llama al siguiente middleware si la validación es exitosa.
 * @throws {Error} - Si ocurre algún error durante la validación.
*/
const validateMedico = async (req = request, res = response, next) => {
  try {
    const token = req.header("user-token");
    if (!token) {
      return error400(res, "Debe autenticarse");
    }
    const { payload } = jwt.decode(token, { complete: true });
    const user = await Usuario.findById(payload.id);
    if (!(user.rol === "Medico")) {
      return error400(res, "El usuario no cuenta con los permisos necesarios");
    }
  } catch (err) {
    console.log(err);
    return error500(res);
  }
  next();
};

module.exports = { validateEnfermero, validateMedico };
