const { request, response } = require("express");
const { error400, error500 } = require("../helpers/resp");
const {registrarExamenes} = require('../examenes/registrar')

const registrarExamen = async (req = request, res = response) => {
  try {
    const { op } = req.params;
    const { cedula } = req.query;

    console.log( op,cedula)

   return registrarExamenes(req,res,op,cedula)

  } catch (error) {
    console.log(error);
    error500(res)
  }
};

module.exports = {
  registrarExamen,
};
