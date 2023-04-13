const jwt = require("jsonwebtoken");
const { body, param } = require("express-validator");
const { error400, error500 } = require("../helpers/resp");
const Usuario = require("../models/users.model");

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

module.exports = { validateEnfermero,validateMedico };
