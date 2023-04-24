const { Router } = require("express");
const {
  getCitas,
  getCitasByEspecialidad,
  reservarCita,
  getCitasUsuario,
  cancelarCita,
} = require("../controllers/citas.controller");

const router = Router();

/**
 * @route GET /citas/todas
 * @description Obtener todas las citas existentes
 * @returns {Array} Array con todas las citas existentes
 * @throws {Error} Si ocurre un error al obtener las citas
 */
router.get("/todas", getCitas);

/**
 * @route GET /citas/solicitar
 * @description Obtener las citas disponibles para una especialidad en particular
 * @param {string} especialidad - La especialidad para la cual se quieren obtener las citas disponibles
 * @returns {Array} Array con las citas disponibles para la especialidad especificada
 * @throws {Error} Si ocurre un error al obtener las citas
 */
router.post("/solicitar", getCitasByEspecialidad);

/**
 * @route POST /citas/reservar
 * @description Reservar una cita para un paciente
 * @param {string} cedulaPaciente - La cédula del paciente que está reservando la cita
 * @param {string} idCita - El ID de la cita que se quiere reservar
 * @returns {Object} Objeto con la información de la cita reservada
 * @throws {Error} Si ocurre un error al reservar la cita
 */
router.post("/reservar", reservarCita);

router.get("/citasUsuario", getCitasUsuario);

router.post("/cancelarCita",cancelarCita)

module.exports = router;
