const { request, response } = require("express");
const { buscarPorCedula } = require("./buscarPorCedula");

const busqueda = async (req = request, res = response) => {
  const { op } = req.query;
  //const pacientes = await Pacientes.find({ cedula: cedula });
  if (op === "1") {
    const resultado = await buscarPorCedula(req, res);
    return resultado
  }

  if (op === "2") {
    console.log("Busca por nombre");
  }
};

module.exports = { busqueda };
