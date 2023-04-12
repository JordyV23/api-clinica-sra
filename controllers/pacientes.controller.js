const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const Pacientes = require("../models/pacientes.model");
const { error500, sinCoincidencias, error400 } = require("../helpers/resp");
const { busqueda } = require("../pacientes/busqueda");

const registrarPaciente = async (req = request, res = response) => {
  try {
    const {
      cedula,
      nombreCompleto,
      peso,
      edad,
      altura,
      enfermedades,
      tipoDeSangre,
      medicamentosAlergicos,
      contactoDeEmergencia,
    } = req.body;

    const paciente = new Pacientes({
      cedula,
      nombreCompleto,
      peso,
      edad,
      altura,
      enfermedades,
      tipoDeSangre,
      medicamentosAlergicos,
      contactoDeEmergencia,
    });

    await paciente.save();

    return res.status(200).json({
      success: true,
      message: "Paciente agregado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return error500(res, error);
  }
};

const obtenerPacientes = async (req = request, res = response) => {
  try {
    const pacientes = await Pacientes.find();

    return res.status(200).json({
      success: true,
      message: "Accion Ejecutada con Exito",
      pacientes: pacientes,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

const buscarPaciente = async (req = request, res = response) => {
  try {
    //const pacientes = await Pacientes.find({ cedula: cedula });
    resultado = await busqueda(req, res);
    if(resultado.length<1){
      return error400(res,"No se han encontrado pacientes")
    }

    return res.status(200).json({
      success: true,
      message: "Accion Ejecutada con Exito",
      pacientes: resultado,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

const eliminarPaciente = async (req = request, res = response) => {
  try {
    const { cedula } = req.params;
    const paciente = await Pacientes.findOne({ cedula: cedula });

    if (paciente.length === 0) {
      return error400(res, "Este paciente no existe");
    }

    await Pacientes.deleteOne({ cedula: cedula });

    return res.status(200).json({
      success: true,
      message: "Paciente eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

module.exports = {
  registrarPaciente,
  obtenerPacientes,
  buscarPaciente,
  eliminarPaciente,
};
