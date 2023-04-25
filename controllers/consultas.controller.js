const { request, response } = require("express");
const Consultas = require("../models/consultas.model");
const { error500, sinCoincidencias, error400 } = require("../helpers/resp");
const pacientesModel = require("../models/pacientes.model");
const { crearExamenes } = require("../examenes/crearExamen");

/**
 * @function getConsultas
 * @async
 * @param {Object} req - objeto request de express
 * @param {Object} res - objeto response de express
 * @returns {Object} objeto con el estado de la respuesta, un mensaje y un arreglo de consultas.
 * @throws {Error} si ocurre un error al buscar las consultas en la base de datos.
 * @description Función que busca todas las consultas que no han sido finalizadas.
 */
const getConsultas = async (req = request, res = response) => {
  try {
    const consultas = await Consultas.find({ finalizada: false });

    return res.status(200).json({
      success: true,
      message: "Accion ejecutada exitosamente",
      consultas: consultas,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * @function getConsulta
 * @async
 * @param {Object} req - objeto request de express que contiene los parámetros de la consulta.
 * @param {Object} res - objeto response de express que será enviado como respuesta.
 * @returns {Object} objeto con el estado de la respuesta, un mensaje y la consulta encontrada.
 * @throws {Error} si ocurre un error al buscar la consulta en la base de datos.
 * @description Función que busca una consulta por su id.
 */
const getConsulta = async (req = request, res = response) => {
  try {
    const { idConsulta } = req.params;
    const consulta = await Consultas.findById(idConsulta);

    if (!consulta) {
      return error400(res, "Consulta no existente");
    }

    return res.status(200).json({
      success: true,
      message: "Accion ejecutada exitosamente",
      consulta: consulta,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @function inicializarConsulta
 * @async
 * @param {Object} req - objeto request de express que contiene los datos de la consulta a inicializar.
 * @param {Object} res - objeto response de express que será enviado como respuesta.
 * @returns {Object} objeto con el estado de la respuesta y un mensaje indicando si la acción se ejecutó correctamente.
 * @throws {Error} si ocurre un error al intentar guardar la nueva consulta en la base de datos.
 * @description Función que inicializa una nueva consulta con los datos proporcionados en el body de la solicitud.
 */
const inicializarConsulta = async (req = request, res = response) => {
  try {
    const {
      cedulaPaciente,
      nombrePaciente,
      fecha,
      peso,
      presion,
      altura,
      sintomas,
    } = req.body;

    const consulta = new Consultas({
      cedulaPaciente,
      nombrePaciente,
      fecha,
      peso,
      presion,
      altura,
      sintomas,
      diagnostico: "-",
      medicamentos: "-",
      examenes: [],
    });

    await consulta.save();

    await pacientesModel.findOneAndUpdate(
      { cedula: cedulaPaciente },
      {
        $push: {
          peso: { fecha: fecha, peso: peso },
          presionArterial: { fecha: fecha, presionArterial: presion },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Consulta inicializada exitosamente",
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * @function diagnostico
 * @async
 * @param {Object} req - objeto request de express que contiene los datos del diagnóstico a realizar.
 * @param {Object} res - objeto response de express que será enviado como respuesta.
 * @returns {Object} objeto con el estado de la respuesta y un mensaje indicando si la acción se ejecutó correctamente.
 * @throws {Error} si ocurre un error al intentar actualizar la consulta en la base de datos.
 * @description Función que realiza el diagnóstico de una consulta existente.
 */
const diagnostico = async (req = request, res = response) => {
  try {
    const { idConsulta, diagnostico, medicamentos, examenes } = req.body;

    const consulta = await Consultas.findOneAndUpdate(
      { _id: idConsulta },
      {
        $set: {
          diagnostico: diagnostico,
          medicamentos: medicamentos,
          examenes: examenes,
          finalizada: true,
        },
      },
      { new: true }
    );

    await crearExamenes(res, consulta);

    return res.status(200).json({
      success: true,
      message: "Diagnostico realizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

module.exports = {
  inicializarConsulta,
  diagnostico,
  getConsultas,
  getConsulta,
};
