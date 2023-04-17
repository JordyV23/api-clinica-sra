const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const { buscarUnoPorCedula } = require("./buscarUnoPorCedula");
const { buscarUnoPorId } = require("./buscarUnoPorId");

const buscarUno = async (req = request, res = response, op, valor, tipo) => {
  try {
    if (op === "cedula") {
      return await buscarUnoPorCedula(req, res, valor, tipo);
    }
    if (op === "id") {
      return await buscarUnoPorId(req, res, valor, tipo);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

module.exports = {
  buscarUno,
};
