const { Router } = require("express");
const {
  inicializarConsulta,
  diagnostico,
  getConsultas,
  getConsulta,
} = require("../controllers/consultas.controller");
const router = Router();

router.get("/getAll", getConsultas);

//validar longitud de id que sea de 12 y que sea string
router.get("/get/:idConsulta",getConsulta)

//validar que el rol sea enfermera
router.post("/inicializarConsulta", inicializarConsulta);

//validar que el rol sea doctor
router.post("/diagnostico", diagnostico);

module.exports = router;
