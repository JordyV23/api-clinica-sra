const { request, response } = require("express");
const { buscarPorCedula } = require("./buscarPorCedula");
const { buscarPorNombre } = require("./buscarPorNombre");

const busqueda = async (req = request, res = response) => {
  const { op } = req.query;
  //const pacientes = await Pacientes.find({ cedula: cedula });
  if (op === "1") {
    const resultado = await buscarPorCedula(req, res);
    return resultado
  }

  if (op === "2") {
    const resultado = await buscarPorNombre(req,res)
    return resultado
  }
};

module.exports = { busqueda };
