const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const examenSangreModel = require("../models/examenSangre.model");
const examenOrinaModel = require("../models/examenOrina.model");

const buscarUnoPorId = async (req = request, res = response, valor, tipo) => {
  try {
    if (tipo === "Sangre") {
      return await buscador(res, examenSangreModel, valor);
    }

    if (tipo === "Orina") {
      return await buscador(res, examenOrinaModel, valor);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

const buscador = async (res, modelo, valor) => {
  const examen = await modelo.findById(valor);

  return res.status(200).json({
    success: true,
    message: "Resultados Encontrados",
    examen: examen,
  });
};

module.exports = { buscarUnoPorId };