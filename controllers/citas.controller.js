const { request, response } = require("express");
const { error500, sinCoincidencias, error400 } = require("../helpers/resp");
const Citas = require("../models/citas.model");
const moment = require("moment");


/**
 * Busca todas las citas disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud express.
 * @param {Object} res - Objeto de respuesta express.
 * @returns {Object} Respuesta de JSON con citas disponibles.
 * @throws {Object} Error de servidor.
 */
const getCitas = async (req = request, res = response) => {
  try {
    const citasDisponibles = await Citas.find({ disponible: true });
    if (citasDisponibles.length===0) {
      return sinCoincidencias(res);
    }
    return res.status(200).json({
      success: true,
      citas: citasDisponibles,
    });
  } catch (error) {
    console.log(error);
    return error500(res, error);
  }
};

/**
 * Busca citas disponibles por especialidad y fecha.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud express.
 * @param {Object} res - Objeto de respuesta express.
 * @returns {Object} Respuesta de JSON con citas disponibles.
 * @throws {Object} Error de servidor.
*/
const getCitasByEspecialidad = async (req = request, res = response) => {
  try {
    const { especialidad } = req.body;

    if (!especialidad) {
      return error400(res, "Debe de seleccionar una especialidad");
    }
    const citasDisponibles = await Citas.find({
      disponible: true,
      especialidad: especialidad,
      fecha: {
        $gte: moment().format("YYYY-MM-DD"),
        $lte: moment().add(1, "day").format("YYYY-MM-DD"),
      },
    });
    if (citasDisponibles.length === 0) {
      return sinCoincidencias(res);
    }

    return res.status(200).json({
      success: true,
      citas: citasDisponibles,
    });
  } catch (error) {
    console.log(error);
    return error500(res, error);
  }
};

module.exports = {
  getCitas,
  getCitasByEspecialidad,
};
