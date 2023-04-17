const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const examenSangreModel = require("../models/examenSangre.model");
const examenOrinaModel = require("../models/examenOrina.model");

/**
 * Busca todos los exámenes realizados en la base de datos.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado de la búsqueda de todos los exámenes realizados.
 * @throws {Error} Si ocurre un error durante el proceso de búsqueda de todos los exámenes realizados.
 */
const Realizados = async (req = request, res = response) => {
  try {
    return await buscador(res, true);
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca todos los exámenes en la base de datos.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado de la búsqueda de todos los exámenes.
 * @throws {Error} Si ocurre un error durante el proceso de búsqueda de todos los exámenes.
 */
const Todos = async (req = request, res = response) => {
  try {
    const sangre = await examenSangreModel.find({});
    const orina = await examenOrinaModel.find({});

    return res.status(200).json({
      success: true,
      message: "Resultados Encontrados",
      examenSangre: sangre,
      examenOrina: orina,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca los exámenes pendientes en la base de datos.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado de la búsqueda de exámenes pendientes.
 * @throws {Error} Si ocurre un error durante el proceso de búsqueda de exámenes pendientes.
 */
const Pendientes = async (req = request, res = response) => {
  try {
    return await buscador(res, false);
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca los exámenes de un tipo específico que ya han sido realizados
 * @param {Object} res - Objeto de respuesta de Express
 * @param {string} tipo - Tipo de examen a buscar (Sangre u Orina)
 * @returns {Promise} - Promesa que resuelve con un objeto de respuesta de éxito o un error 500 en caso de falla
 */
const RealizadosTipo = async (res, tipo) => {
  try {
    if (tipo === "Sangre") {
      return await buscarPorTipo(res, examenSangreModel, true);
    }

    if (tipo === "Orina") {
      return await buscarPorTipo(res, examenOrinaModel, true);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca los exámenes pendientes por tipo (sangre o orina).
 * @async
 * @function
 * @param {Object} res - Objeto response de Express.
 * @param {string} tipo - Tipo de examen a buscar (sangre o orina).
 * @returns {Promise<void>} - Promesa que resuelve una respuesta HTTP con los exámenes encontrados.
 */
const PendientesTipo = async (res, tipo) => {
  try {
    if (tipo === "Sangre") {
      return await buscarPorTipo(res, examenSangreModel, false);
    }
    if (tipo === "Orina") {
      return await buscarPorTipo(res, examenOrinaModel, false);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca los exámenes de un tipo específico según su estado (realizados o pendientes)
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Object} modelo - Modelo de Mongoose correspondiente al tipo de examen a buscar
 * @param {boolean} estado - Estado del examen a buscar (true para realizados, false para pendientes)
 * @returns {Object} - Objeto de respuesta de Express con los resultados de la búsqueda
 */
const buscarPorTipo = async (res, modelo, estado) => {
  const resultado = await modelo.find({ realizado: estado });
  return res.status(200).json({
    success: true,
    message: "Resultados Encontrados",
    examenes: resultado,
  });
};

/**
 * Realiza una búsqueda de los exámenes de sangre y orina según el valor de estado.
 * @param {Object} res - Objeto response de Express.
 * @param {boolean} valor - Estado de los exámenes a buscar.
 * @returns {Object} Objeto response con el resultado de la búsqueda.
 */
const buscador = async (res, valor) => {
  const sangre = await examenSangreModel.find({ realizado: valor });
  const orina = await examenOrinaModel.find({ realizado: valor });

  return res.status(200).json({
    success: true,
    message: "Resultados Encontrados",
    examenSangre: sangre,
    examenOrina: orina,
  });
};

module.exports = {
  Realizados,
  Todos,
  Pendientes,
  RealizadosTipo,
  PendientesTipo,
};
