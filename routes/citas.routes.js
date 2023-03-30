const { Router } = require("express");
const { getCitas,getCitasByEspecialidad } = require("../controllers/citas.controller");

const router = Router();

router.get("/todas", getCitas);
router.get("/solicitar", getCitasByEspecialidad);

module.exports = router;
