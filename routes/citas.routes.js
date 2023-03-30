const { Router } = require("express");
const { getCitas,getCitasByEspecialidad, reservarCita } = require("../controllers/citas.controller");

const router = Router();

router.get("/todas", getCitas);
router.get("/solicitar", getCitasByEspecialidad);
router.post("/reservar",reservarCita)

module.exports = router;
