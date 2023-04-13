const { request, response } = require("express");
const Consultas = require("../models/consultas.model");
const { error500, sinCoincidencias, error400 } = require("../helpers/resp");
const pacientesModel = require("../models/pacientes.model");

const inicializarConsulta = async (req = request, res = response) => {
  try {
    const {
      cedulaPaciente,
      nombrePaciente,
      fecha,
      peso,
      presion,
      altura,
      sintomas,
    } = req.body;

    const consulta = new Consultas({
      cedulaPaciente,
      nombrePaciente,
      fecha,
      peso,
      presion,
      altura,
      sintomas,
      diagnostico: "-",
      medicamentos: "-",
      examenes: [],
    });

    await consulta.save();

    await pacientesModel.findOneAndUpdate(
      { cedula: cedulaPaciente },
      { $push: { peso: { fecha: fecha, peso: peso } } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Consulta inicializada exitosamente",
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

module.exports = {
  inicializarConsulta,
};
