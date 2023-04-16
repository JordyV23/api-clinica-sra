const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const { actualizarSangre } = require("./registrarSangre");
const { actualizarOrina } = require("./registrarOrina");

const registrarExamenes = async (req = request, res = response, op, cedula) => {
  try {
    if (op === "sangre") {
      return actualizarSangre(req, res, op, cedula);
    }

    if (op === "orina") {
      return actualizarOrina(req, res, op, cedula);
    }
  } catch (err) {
    console.log(err);
    return error500(res);
  }
};

module.exports = { registrarExamenes };
