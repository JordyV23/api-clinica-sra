const { Router } = require("express");
const { getCitas } = require("../controllers/citas.controller");

const router = Router();

router.get("/solicitar", getCitas);

module.exports = router;
