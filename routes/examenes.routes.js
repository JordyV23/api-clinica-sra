const { Router } = require("express");
const {
  registrarExamen,
  getOneExamen,
  getTodosExamen,
  getTodosPorTipo,
} = require("../controllers/examenes.controller");
const { validateRol } = require("../middlewares/examenes.valitations");
const router = Router();

/**
 * @function registrarExamen
 * @description Endpoint para registrar un examen de acuerdo a la operación indicada.
 * @param {Object} req - Request object.
 * @param {Object} req.params - Parámetros enviados en la URL.
 * @param {string} req.params.op - Operación a realizar.
 * @param {Object} res - Response object.
 * @returns {Promise<Object>} - Retorna una promesa que resuelve en el objeto del examen registrado.
 */
router.post("/registrarExamen/:op", [validateRol], registrarExamen);

/**
 * @function getOneExamen
 * @description Endpoint para obtener un examen de acuerdo a la operación indicada.
 * @param {Object} req - Request object.
 * @param {Object} req.params - Parámetros enviados en la URL.
 * @param {string} req.params.op - Operación a realizar.
 * @param {Object} res - Response object.
 * @returns {Promise<Object>} - Retorna una promesa que resuelve en el objeto del examen obtenido.
 */
router.get("/getExamen/:op", getOneExamen);

/**
 * @function getTodosExamen
 * @description Endpoint para obtener todos los exámenes de acuerdo a la operación indicada.
 * @param {Object} req - Request object.
 * @param {Object} req.params - Parámetros enviados en la URL.
 * @param {string} req.params.op - Operación a realizar.
 * @param {Object} res - Response object.
 * @returns {Promise<Object[]>} - Retorna una promesa que resuelve en un arreglo de objetos con todos los exámenes obtenidos.
 */
router.get("/getAll/:op", getTodosExamen);

/**
 * @function getTodosPorTipo
 * @description Endpoint para obtener todos los exámenes de acuerdo a la operación y tipo de examen indicados.
 * @param {Object} req - Request object.
 * @param {Object} req.params - Parámetros enviados en la URL.
 * @param {string} req.params.op - Operación a realizar.
 * @param {string} req.params.tipo - Tipo de examen a buscar.
 * @param {Object} res - Response object.
 * @returns {Promise<Object[]>} - Retorna una promesa que resuelve en un arreglo de objetos con todos los exámenes del tipo indicado.
 */
router.get("/getAll/:op/:tipo", getTodosPorTipo);

module.exports = router;
