const { request, response } = require("express");
const Pacientes = require('../models/pacientes.model')

/**
 * Busca pacientes por nombre completo
 * @async
 * @function
 * @param {Object} req - Objeto request de Express
 * @param {Object} res - Objeto response de Express
 * @returns {Promise<Object[]>} - Retorna una promesa que resuelve en un array de objetos con los pacientes encontrados.
 * @throws {Error} - Si ocurre algún error al buscar los pacientes.
 */

const buscarPorNombre = async (req=request, res=response) => { 
    const { valor } = req.params;
    const regex = new RegExp(valor, "i");
    const paciente = await Pacientes.find({nombreCompleto:regex})
    return paciente
};

module.exports = {
    buscarPorNombre,
};
