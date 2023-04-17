const { request, response } = require("express");
const { error400, error500 } = require("../helpers/resp");
const { registrarExamenes } = require("../examenes/registrar");
const {
  buscarUno,
  buscarTodos,
  buscarTodosPorTipo,
} = require("../examenes/buscar");

/**
 * Registra un examen en la base de datos.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado del registro del examen.
 * @throws {Error} Si ocurre un error durante el proceso de registro del examen.
 */
const registrarExamen = async (req = request, res = response) => {
  try {
    const { op } = req.params;
    const { cedula } = req.query;

    return registrarExamenes(req, res, op, cedula);
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

/**
 * Registra un examen en la base de datos.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado del registro del examen.
 * @throws {Error} Si ocurre un error durante el proceso de registro del examen.
 */
const getOneExamen = async (req = request, res = response) => {
  try {
    const { op } = req.params;
    const { valor, tipo } = req.query;
    return buscarUno(req, res, op, valor, tipo);
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

/**
 * Obtiene todos los exámenes de la base de datos.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado de la búsqueda de todos los exámenes.
 * @throws {Error} Si ocurre un error durante el proceso de búsqueda de todos los exámenes.
 */
const getTodosExamen = async (req = request, res = response) => {
  try {
    const { op } = req.params;
    return await buscarTodos(req, res, op);
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

/**
 * Obtiene todos los exámenes de un determinado tipo de la base de datos.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado de la búsqueda de todos los exámenes de un tipo específico.
 * @throws {Error} Si ocurre un error durante el proceso de búsqueda de todos los exámenes de un tipo específico.
 */
const getTodosPorTipo = async (req = request, res = response) => {
  try {
    const { op, tipo } = req.params;
    return await buscarTodosPorTipo(req, res, op, tipo);
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

module.exports = {
  registrarExamen,
  getOneExamen,
  getTodosExamen,
  getTodosPorTipo,
};
