const { Router } = require("express");
const { login,register, getUsuario} = require("../controllers/users.controller");

const router = Router();

router.post("/login", login);

router.post("/register", register)

router.get("/user", getUsuario)

module.exports = router;
