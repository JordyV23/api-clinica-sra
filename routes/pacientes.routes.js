const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { registrarPaciente, obtenerPacientes, eliminarPaciente, buscarPaciente, actualizarPaciente } = require("../controllers/pacientes.controller");
const { valRegisterPaciente,valContacto, valUnico } = require("../middlewares/pacientes.validations");

router.post("/registrarPaciente", [valUnico,valRegisterPaciente, valContacto], registrarPaciente);

router.get('/getPacientes', obtenerPacientes);

router.get('/buscarPaciente/:valor', buscarPaciente);

router.put('/actualizarPaciente/', actualizarPaciente)

router.delete('/eliminarPaciente/:cedula', eliminarPaciente)


module.exports = router;
