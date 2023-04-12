const { body } = require("express-validator");
const { error400, error500 } = require("../helpers/resp");
const Pacientes = require("../models/pacientes.model");

const valUnico = async (req, res, next) => {
  const { cedula } = req.body;
  const paciente = await Pacientes.find({ cedula: cedula });
  if (paciente.length >= 1) {
    return error400(res, "Este paciente ya existe");
  }
  next();
};

const valRegisterPaciente = (req, res, next) => {
  return [
    body("peso", "el peso es obligatorio").trim().not().isEmpty(),
    body("edad", "la edad es obligatoria").trim().not().isEmpty(),
    body("altura", "la altura es obligatoria").trim().not().isEmpty(),
    body("tipoDeSangre", "el tipoDeSangre es obligatorio")
      .trim()
      .not()
      .isEmpty(),
    next(),
  ];
};

const valContacto = (req, res, next) => {
  const { contactoDeEmergencia } = req.body;
  if (
    !contactoDeEmergencia ||
    !Array.isArray(contactoDeEmergencia) ||
    contactoDeEmergencia.length < 1
  ) {
    return error400(
      res,
      "El usuario debe de tener al menos un contacto de emergencia"
    );
  }
  next();
};

module.exports = {
  valUnico,
  valRegisterPaciente,
  valContacto,
};
