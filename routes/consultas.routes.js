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

router.get("/getAll", getConsultas);

router.get("/get/:idConsulta", getConsulta);

router.post("/inicializarConsulta", [validateEnfermero], inicializarConsulta);

router.post("/diagnostico", [validateMedico], diagnostico);

module.exports = router;
