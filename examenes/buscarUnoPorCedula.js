const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const examenSangreModel = require("../models/examenSangre.model");
const examenOrinaModel = require("../models/examenOrina.model");

/**
 * Busca un examen por cédula y tipo de examen.
 * @async
 * @param {Request} req - Request object.
 * @param {Response} res - Response object.
 * @param {string} valor - Valor de la cédula a buscar.
 * @param {string} tipo - Tipo de examen a buscar ("Sangre" o "Orina").
 * @returns {Promise<Response>} - Objeto Response con la respuesta de la búsqueda.
 */
const buscarUnoPorCedula = async (
  req = request,
  res = response,
  valor,
  tipo
) => {
  try {
    if (tipo === "Sangre") {
      buscador(res, examenSangreModel, valor);
    }
    if (tipo === "Orina") {
      buscador(res, examenOrinaModel, valor);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca un examen por la cédula del paciente y el estado "realizado".
 * @async
 * @function buscador
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Object} modelo - Modelo de Mongoose para buscar los exámenes.
 * @param {String} valor - Valor de la cédula del paciente a buscar.
 * @returns {Object} Objeto JSON con la respuesta de la búsqueda.
 * @throws {Error} Si hay algún error durante la búsqueda.
 */
const buscador = async (res, modelo, valor) => {
  const examen = await modelo.findOne({
    cedulaPaciente: valor,
    realizado: false,
  });

  return res.status(200).json({
    success: true,
    message: "Resultados Encontrados",
    examen: examen,
  });
};

module.exports = {
  buscarUnoPorCedula,
};
