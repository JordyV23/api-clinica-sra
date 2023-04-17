const { request, response } = require("express");
const { error400, error500 } = require("../helpers/resp");
const { registrarExamenes } = require("../examenes/registrar");
const { buscarUno } = require("../examenes/buscar");

const registrarExamen = async (req = request, res = response) => {
  try {
    const { op } = req.params;
    const { cedula } = req.query;

    return registrarExamenes(req, res, op, cedula);
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

const getOneExamen = async (req = request, res = response) => {
  try {
    const { op } = req.params;
    const {valor,tipo} = req.query
    return buscarUno(req,res,op,valor,tipo);

  } catch (error) {
    console.log(error);
    error500(res);
  }
};

module.exports = {
  registrarExamen,
  getOneExamen
};
