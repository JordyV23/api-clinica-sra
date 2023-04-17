const { request, response } = require("express");
const { error400, error500 } = require("../helpers/resp");
const { registrarExamenes } = require("../examenes/registrar");
const { buscarUno, buscarTodos, buscarTodosPorTipo } = require("../examenes/buscar");

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
    const { valor, tipo } = req.query;
    return buscarUno(req, res, op, valor, tipo);
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

const getTodosExamen = async (req = request, res = response) => {
  try {
    const { op } = req.params;
    return await buscarTodos(req, res, op);
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

const getTodosPorTipo = async (req = request, res = response) => {
  try {
    const { op,tipo } = req.params;
    return await buscarTodosPorTipo(req, res, op, tipo);
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

module.exports = {
  registrarExamen,
  getOneExamen,
  getTodosExamen,
  getTodosPorTipo
};
