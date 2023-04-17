const { request, response } = require("express");
const Pacientes = require('../models/pacientes.model')

/**
 * Busca un paciente por su cédula.
 * @async
 * @param {import("express").Request} req - La solicitud HTTP.
 * @param {import("express").Response} res - La respuesta HTTP.
 * @returns {Promise<import("mongoose").Document>} El paciente encontrado.
 */
const buscarPorCedula = async (req=request, res=response) => { 
    const { valor } = req.params;
    const paciente = await Pacientes.find({cedula:valor})
    return paciente
};

module.exports = {
  buscarPorCedula,
};
