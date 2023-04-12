const { request, response } = require("express");
const Pacientes = require('../models/pacientes.model')

const buscarPorCedula = async (req=request, res=response) => { 
    const { valor } = req.params;
    const paciente = await Pacientes.find({cedula:valor})
    return paciente
};

module.exports = {
  buscarPorCedula,
};
