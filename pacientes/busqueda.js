const { request, response } = require("express");
const { buscarPorCedula } = require("./buscarPorCedula");
const { buscarPorNombre } = require("./buscarPorNombre");

/**
 * Realiza una búsqueda de pacientes según un criterio especificado.
 * @async
 * @function
 * @param {Request} req - Objeto Request de Express.
 * @param {Response} res - Objeto Response de Express.
 * @returns {Promise} - Promesa que resuelve con el resultado de la búsqueda.
 * @throws {Error} - Error si ocurre algún problema al buscar los pacientes.
 */
const busqueda = async (req = request, res = response) => {
  const { op } = req.query;
  if (op === "1") {
    const resultado = await buscarPorCedula(req, res);
    return resultado
  }

  if (op === "2") {
    const resultado = await buscarPorNombre(req,res)
    return resultado
  }
};

module.exports = { busqueda };
