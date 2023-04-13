const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  registrarPaciente,
  obtenerPacientes,
  eliminarPaciente,
  buscarPaciente,
  actualizarPaciente,
} = require("../controllers/pacientes.controller");
const {
  valRegisterPaciente,
  valContacto,
  valUnico,
} = require("../middlewares/pacientes.validations");

/**
 * Registra un nuevo paciente en la base de datos.
 *
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @param {NextFunction} next - Función de siguiente middleware.
 * @returns {void}
 */
router.post(
  "/registrarPaciente",
  [valUnico, valRegisterPaciente, valContacto],
  registrarPaciente
);

/**
 * Obtiene todos los pacientes registrados en la base de datos.
 *
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @returns {void}
 */
router.get("/getPacientes", obtenerPacientes);

/**
 * Busca un paciente por valor en la base de datos.
 *
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @returns {void}
 */
router.get("/buscarPaciente/:valor", buscarPaciente);

/**
 * Actualiza la información de un paciente en la base de datos.
 *
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @returns {void}
 */
router.put("/actualizarPaciente/", actualizarPaciente);

/**
 * Elimina un paciente de la base de datos.
 *
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @returns {void}
 */
router.delete("/eliminarPaciente/:cedula", eliminarPaciente);

module.exports = router;
