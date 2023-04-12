const { request, response } = require("express");
const Pacientes = require('../models/pacientes.model')

const buscarPorNombre = async (req=request, res=response) => { 
    const { valor } = req.params;
    const regex = new RegExp(valor, "i");
    const paciente = await Pacientes.find({nombreCompleto:regex})
    return paciente
};

module.exports = {
    buscarPorNombre,
};
