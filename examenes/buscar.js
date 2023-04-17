const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const { buscarUnoPorCedula } = require("./buscarUnoPorCedula");
const { buscarUnoPorId } = require("./buscarUnoPorId");
const { Todos, Realizados, Pendientes } = require("./buscarTodos");

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

const buscarTodos = async (req = request, res = response, op) => {
  //Realizados -  Todos - Pendientes
  try {
    if (op === "Todos") {
      return await Todos(req, res);
    }
    if (op === "Realizados") {
      return await Realizados(req, res);
    }
    if (op === "Pendientes") {
      return await Pendientes(req, res);
    }
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

//buscarTodosPorTipo
//RealizadosTipo PendientesTipo

module.exports = {
  buscarUno,
  buscarTodos,
};
