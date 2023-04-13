const { request, response } = require("express");
const Consultas = require("../models/consultas.model");
const { error500, sinCoincidencias, error400 } = require("../helpers/resp");
const pacientesModel = require("../models/pacientes.model");

const getConsultas = async (req = request, res = response) => {
  try {
    const consultas = await Consultas.find({ finalizada: false });

    return res.status(200).json({
      success: true,
      message: "Accion ejecutada exitosamente",
      consultas: consultas,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

const getConsulta = async (req = request, res = response) => {
  try {
    const { idConsulta } = req.params;
    const consulta = await Consultas.findById(idConsulta);

    if (!consulta) {
      return error400(res, "Consulta no existente");
    }

    return res.status(200).json({
      success: true,
      message: "Accion ejecutada exitosamente",
      consulta: consulta,
    });
  } catch (error) {
    console.log(error);
  }
};

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

const diagnostico = async (req = request, res = response) => {
  try {
    const { idDiagnostico, diagnostico, medicamentos, examenes } = req.body;

    await Consultas.findOneAndUpdate(
      { _id: idDiagnostico },
      {
        $set: {
          diagnostico: diagnostico,
          medicamentos: medicamentos,
          examenes: examenes,
          finalizada: true,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Diagnostico realizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

module.exports = {
  inicializarConsulta,
  diagnostico,
  getConsultas,
  getConsulta,
};
