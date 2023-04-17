const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const { buscarUnoPorCedula } = require("./buscarUnoPorCedula");
const { buscarUnoPorId } = require("./buscarUnoPorId");
const {
  Todos,
  Realizados,
  Pendientes,
  RealizadosTipo,
  PendientesTipo,
} = require("./buscarTodos");

/**
 * Busca un examen en la base de datos según su valor y tipo de búsqueda.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @param {string} op - El tipo de operación de búsqueda ("cedula" o "id").
 * @param {string} valor - El valor a buscar.
 * @param {string} tipo - El tipo de búsqueda ("exacto" o "aproximado").
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado de la búsqueda del examen.
 * @throws {Error} Si ocurre un error durante el proceso de búsqueda del examen.
 */
const buscarUno = async (req = request, res = response, op, valor, tipo) => {
  try {
    if (op === "cedula") {
      return await buscarUnoPorCedula(req, res, valor, tipo);
    }
    if (op === "id") {
      return await buscarUnoPorId(req, res, valor, tipo);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca todos los exámenes de la base de datos según el tipo de búsqueda.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @param {string} op - El tipo de operación de búsqueda ("Todos", "Realizados" o "Pendientes").
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado de la búsqueda de todos los exámenes según el tipo de búsqueda.
 * @throws {Error} Si ocurre un error durante el proceso de búsqueda de todos los exámenes según el tipo de búsqueda.
 */
const buscarTodos = async (req = request, res = response, op) => {
  try {
    if (op === "Todos") {
      return await Todos(req, res);
    }
    if (op === "Realizados") {
      return await Realizados(req, res);
    }
    if (op === "Pendientes") {
      return await Pendientes(req, res);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca todos los exámenes de la base de datos según el tipo de búsqueda y el tipo de examen.
 * @async
 * @function
 * @param {import("express").Request} [req=request] - La solicitud HTTP.
 * @param {import("express").Response} [res=response] - La respuesta HTTP.
 * @param {string} op - El tipo de operación de búsqueda ("Realizados" o "Pendientes").
 * @param {string} tipo - El tipo de examen a buscar.
 * @returns {Promise<import("express").Response>} La respuesta HTTP con el resultado de la búsqueda de todos los exámenes según el tipo de búsqueda y el tipo de examen.
 * @throws {Error} Si ocurre un error durante el proceso de búsqueda de todos los exámenes según el tipo de búsqueda y el tipo de examen.
 */
const buscarTodosPorTipo = async (req = request, res = response, op, tipo) => {
  try {
    if (op === "Realizados") {
      return await RealizadosTipo(res, tipo);
    }
    if (op === "Pendientes") {
      return await PendientesTipo(res, tipo);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

module.exports = {
  buscarUno,
  buscarTodos,
  buscarTodosPorTipo,
};
