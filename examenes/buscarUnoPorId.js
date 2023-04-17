const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const examenSangreModel = require("../models/examenSangre.model");
const examenOrinaModel = require("../models/examenOrina.model");

/**
 * Busca un examen por su ID y tipo de examen.
 * @async
 * @function
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {string} valor - El ID del examen a buscar.
 * @param {string} tipo - El tipo de examen a buscar ("Sangre" o "Orina").
 * @returns {Promise<Object>} El objeto de respuesta con el examen encontrado.
 * @throws {Error} Si ocurre un error al buscar el examen.
 */
const buscarUnoPorId = async (req = request, res = response, valor, tipo) => {
  try {
    if (tipo === "Sangre") {
      return await buscador(res, examenSangreModel, valor);
    }

    if (tipo === "Orina") {
      return await buscador(res, examenOrinaModel, valor);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca un examen por su id en el modelo especificado
 * @param {Object} res - Objeto de respuesta de express
 * @param {Object} modelo - Modelo de Mongoose donde se buscará el examen
 * @param {string} valor - Id del examen a buscar
 * @returns {Object} Objeto JSON con el examen encontrado o un mensaje de error
 * @throws {Error} Si ocurre un error durante la búsqueda
 */
const buscador = async (res, modelo, valor) => {
  const examen = await modelo.findById(valor);
  return res.status(200).json({
    success: true,
    message: "Resultados Encontrados",
    examen: examen,
  });
};

module.exports = { buscarUnoPorId };
