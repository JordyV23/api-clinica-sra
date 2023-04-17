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
};
