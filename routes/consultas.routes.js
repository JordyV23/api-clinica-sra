const { Router } = require("express");
const {
  inicializarConsulta,
  diagnostico,
  getConsultas,
  getConsulta,
} = require("../controllers/consultas.controller");
const {
  validateMedico,
  validateEnfermero,
} = require("../middlewares/consultas.validations");
const router = Router();

/**
 * @route GET /consultas/getAll
 * @description Obtener todas las consultas registradas.
 * @returns {Object[]} Array de objetos de consulta.
 * @returns {string} Object._id - ID de la consulta.
 * @returns {string} Object.idCita - ID de la cita asociada.
 * @returns {string} Object.idPaciente - ID del paciente asociado.
 * @returns {string} Object.idMedico - ID del médico responsable.
 * @returns {string} Object.idEnfermero - ID del enfermero encargado.
 * @returns {string} Object.fecha - Fecha de la consulta.
 * @returns {string} Object.horaInicio - Hora de inicio de la consulta.
 * @returns {string} Object.horaFin - Hora de finalización de la consulta.
 * @returns {string} Object.motivo - Motivo de la consulta.
 * @returns {string} Object.sintomas - Síntomas presentados por el paciente.
 * @returns {string} Object.tratamiento - Tratamiento recomendado.
 * @returns {string} Object.observaciones - Observaciones del médico.
 * @access Public
 */
router.get("/getAll", getConsultas);

/**
 * @route GET /consultas/get/:idConsulta
 * @group Consultas - Operaciones para consultar y actualizar consultas médicas
 * @summary Obtiene los detalles de una consulta médica especificada por su idConsulta.
 * @param {string} idConsulta.path.required - Id de la consulta médica a buscar.
 * @returns {Consulta} 200 - Detalles de la consulta médica especificada.
 * @returns {Error} 404 - No se encontró ninguna consulta médica con el id proporcionado.
 * @returns {Error} 500 - Error interno del servidor.
 */
router.get("/get/:idConsulta", getConsulta);

/**
 * @route POST /consultas/inicializarConsulta
 * @group Consultas - Operaciones para consultar y actualizar consultas médicas
 * @summary Inicializa una consulta médica y la asocia a un paciente especificado por su cedula.
 * @param {Consulta} Consulta.body.required - Detalles de la consulta médica a inicializar.
 * @param {string} cedulaEnfermero.header.required - Cédula del enfermero que está iniciando la consulta médica.
 * @returns {Consulta} 201 - Detalles de la consulta médica creada.
 * @returns {Error} 400 - La consulta médica no pudo ser creada debido a datos incorrectos o faltantes.
 * @returns {Error} 404 - No se encontró el paciente con la cédula especificada.
 * @returns {Error} 500 - Error interno del servidor.
 */
router.post("/inicializarConsulta", [validateEnfermero], inicializarConsulta);

/**
 * @route POST /consultas/diagnostico
 * @group Consultas - Operaciones para consultar y actualizar consultas médicas
 * @summary Actualiza los detalles de una consulta médica especificada por su idConsulta.
 * @param {Diagnostico} Diagnostico.body.required - Detalles del diagnóstico de la consulta médica.
 * @param {string} cedulaMedico.header.required - Cédula del médico que está actualizando el diagnóstico.
 * @returns {Consulta} 200 - Detalles de la consulta médica actualizada.
 * @returns {Error} 400 - La consulta médica no pudo ser actualizada debido a datos incorrectos o faltantes.
 * @returns {Error} 404 - No se encontró ninguna consulta médica con el id proporcionado.
 * @returns {Error} 500 - Error interno del servidor.
 */
router.post("/diagnostico", [validateMedico], diagnostico);

module.exports = router;
