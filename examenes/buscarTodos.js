const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const examenSangreModel = require("../models/examenSangre.model");
const examenOrinaModel = require("../models/examenOrina.model");

//Realizados - Todos - Pendientes;

const Realizados = async (req = request, res = response) => {
  try {
    return await buscador(res, true);
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};
const Todos = async (req = request, res = response) => {
  try {
    const sangre = await examenSangreModel.find({});
    const orina = await examenOrinaModel.find({});

    return res.status(200).json({
      success: true,
      message: "Resultados Encontrados",
      examenSangre: sangre,
      examenOrina: orina,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};
const Pendientes = async (req = request, res = response) => {
  try {
    return await buscador(res, false);
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

const RealizadosTipo = async (res, tipo) => {
  try {
    if (tipo === "Sangre") {
      return await buscarPorTipo(res, examenSangreModel, true);
    }

    if (tipo === "Orina") {
      return await buscarPorTipo(res, examenOrinaModel, true);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};
const PendientesTipo = async (res, tipo) => {
  try {
    if (tipo === "Sangre") {
      return await buscarPorTipo(res, examenSangreModel, false);
    }

    if (tipo === "Orina") {
      return await buscarPorTipo(res, examenOrinaModel, false);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

const buscarPorTipo = async (res, modelo, estado) => {
  const resultado = await modelo.find({ realizado: estado });
  return res.status(200).json({
    success: true,
    message: "Resultados Encontrados",
    examenes: resultado,
  });
};

const buscador = async (res, valor) => {
  const sangre = await examenSangreModel.find({ realizado: valor });
  const orina = await examenOrinaModel.find({ realizado: valor });

  return res.status(200).json({
    success: true,
    message: "Resultados Encontrados",
    examenSangre: sangre,
    examenOrina: orina,
  });
};

module.exports = {
  Realizados,
  Todos,
  Pendientes,
  RealizadosTipo,
  PendientesTipo
};
