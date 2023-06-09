const { body, validationResult } = require("express-validator");
const { error400, error500 } = require("../helpers/resp");
const Pacientes = require("../models/pacientes.model");

/**
 *Middleware que valida si la cédula de un paciente ya existe en la base de datos.
 *@param {Object} req - Objeto de solicitud.
 *@param {Object} res - Objeto de respuesta.
 *@param {Function} next - Función que llama al siguiente middleware.
 *@returns {Object} - Error 400 si la cédula del paciente ya existe en la base de datos, o llama al siguiente middleware si no hay errores.
 */
const valUnico = async (req, res, next) => {
  const { cedula } = req.body;
  const paciente = await Pacientes.find({ cedula: cedula });
  if (paciente.length >= 1) {
    return error400(res, "Este paciente ya existe");
  }
  next();
};

/**
 * Middleware que valida los campos obligatorios de un registro de paciente.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función que llama al siguiente middleware.
 * @returns {Array} - Retorna un array de validaciones a ser aplicadas en la ruta de registro de pacientes.
 */
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

/**
 * Función que devuelve un arreglo con los objetos de validación de los campos de un formulario de salud.
 * @returns {Array} Arreglo de objetos de validación.
 */
const validate = () => {
  return [
    body("cedula").notEmpty().withMessage("La cédula es requerida"),
    body("peso").notEmpty().withMessage("El peso es requerido"),
    body("edad").notEmpty().withMessage("La edad es requerida"),
    body("altura").notEmpty().withMessage("La altura es requerida"),
    body("enfermedades")
      .notEmpty()
      .withMessage("Las enfermedades son requeridas"),
    body("tipoDeSangre")
      .notEmpty()
      .withMessage("El tipo de sangre es requerido"),
    body("medicamentosAlergicos")
      .notEmpty()
      .withMessage("Los medicamentos alérgicos son requeridos"),
    body("contactoDeEmergencia")
      .notEmpty()
      .withMessage("El contacto de emergencia es requerido"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return error400(res, errors.array());
      }
      next();
    },
  ];
};

/**
 * Función que valida que un usuario tenga al menos un contacto de emergencia
 * @param {Object} req - Objeto request de Express.
 * @param {Object} res - Objeto response de Express.
 * @param {Function} next - Función next de Express.
 * @returns {Function} - Retorna la función next si la validación es exitosa, o error400 si falla.
 */
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
  validate,
};
