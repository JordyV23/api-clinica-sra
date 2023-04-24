const moment = require("moment");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const { error500, sinCoincidencias, error400 } = require("../helpers/resp");
const Citas = require("../models/citas.model");

/**
 * Busca todas las citas disponibles.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud express.
 * @param {Object} res - Objeto de respuesta express.
 * @returns {Object} Respuesta de JSON con citas disponibles.
 * @throws {Object} Error de servidor.
 */
const getCitas = async (req = request, res = response) => {
  try {
    const citasDisponibles = await Citas.find({ disponible: true });
    if (citasDisponibles.length === 0) {
      return sinCoincidencias(res);
    }
    return res.status(200).json({
      success: true,
      citas: citasDisponibles,
    });
  } catch (error) {
    console.log(error);
    return error500(res, error);
  }
};

const getCitasUsuario = async (req = request, res = response) => {
  try {
    const token = req.header("user-token");
    if (!token) {
      return error400(res, "El usuario debe de estar logueado");
    }
    const { payload } = jwt.decode(token, { complete: true });
    const citas = await Citas.find({ idPaciente: payload.id });

    return res.status(200).json({
      success: true,
      citas: citas,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Busca citas disponibles por especialidad y fecha.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud express.
 * @param {Object} res - Objeto de respuesta express.
 * @returns {Object} Respuesta de JSON con citas disponibles.
 * @throws {Object} Error de servidor.
 */
const getCitasByEspecialidad = async (req = request, res = response) => {
  try {
    const { especialidad } = req.body;

    if (!especialidad) {
      return error400(res, "Debe de seleccionar una especialidad");
    }
    const citasDisponibles = await Citas.find({
      disponible: true,
      especialidad: especialidad,
      fecha: {
        $gte: moment().format("YYYY-MM-DD"),
        $lte: moment().add(1, "day").format("YYYY-MM-DD"),
      },
    });
    if (citasDisponibles.length === 0) {
      return sinCoincidencias(res);
    }

    return res.status(200).json({
      success: true,
      citas: citasDisponibles,
    });
  } catch (error) {
    console.log(error);
    return error500(res, error);
  }
};

/**
 * Reserva una cita en el sistema.
 * @async
 * @function
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @returns {Object} - Un objeto JSON que indica si la reserva fue exitosa o no.
 * @throws {Object} - Un objeto JSON que describe el error que ocurrió.
 */
const reservarCita = async (req = request, res = response) => {
  try {
    const token = req.header("user-token");
    if (!token) {
      return error400(res, "El usuario debe autenticarse");
    }
    const { payload } = jwt.decode(token, { complete: true });
    const { idCita, nombreCompleto, telefono } = req.body;
    const cita = await Citas.findById(idCita);
    const citasUsuario = await Citas.find({
      idPaciente: payload.id,
      fecha: cita.fecha,
      hora: cita.hora,
    });
    if (citasUsuario.length > 0) {
      return error400(
        res,
        "El usurio ya tiene una cita agendada a esta hora este dia"
      );
    }
    await Citas.findByIdAndUpdate(idCita, {
      idPaciente: payload.id,
      nombreCompleto: nombreCompleto,
      telefono: telefono,
      disponible: false,
    });
    return res.status(200).json({
      success: true,
      msg: "Su cita ha sido agendada",
    });
  } catch (error) {
    console.log(error);
    return error500(res, error);
  }
};

const cancelarCita = async (req = request, res = response) => {
  try {
    const token = req.header("user-token");
    if (!token) {
      return error400(res,"El usuario debe autenticarse");
    }
    const { idCita } = req.body;
    const cita = Citas.findById(idCita);

    if(!cita){
      return error400(res, "Cita no existente")
    }

    await Citas.findByIdAndUpdate(idCita, {
      idPaciente: null,
      nombreCompleto: "*",
      telefono: "*",
      disponible: true,
    });

    return res.status(200).json({
      success: true,
      msg: "Su cita ha sido cancelada",
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

module.exports = {
  getCitas,
  getCitasByEspecialidad,
  reservarCita,
  getCitasUsuario,
  cancelarCita
};
