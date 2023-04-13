const { Router } = require("express");
const { inicializarConsulta } = require("../controllers/consultas.controller");
const router = Router();


router.post("/inicializarConsulta", inicializarConsulta);


module.exports = router;
