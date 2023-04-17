const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const { actualizarSangre } = require("./registrarSangre");
const { actualizarOrina } = require("./registrarOrina");

/**
 * Registra los exámenes para un paciente.
 *
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {string} op - El tipo de examen a registrar (sangre o orina).
 * @param {string} cedula - La cédula del paciente.
 * @returns {Promise<Object>} - Una promesa que resuelve en el resultado de la actualización de los exámenes.
 */
const registrarExamenes = async (req = request, res = response, op, cedula) => {
  try {
    if (op === "sangre") {
      return actualizarSangre(req, res, op, cedula);
    }

    if (op === "orina") {
      return actualizarOrina(req, res, op, cedula);
    }
  } catch (err) {
    console.log(err);
    return error500(res);
  }
};

module.exports = { registrarExamenes };
