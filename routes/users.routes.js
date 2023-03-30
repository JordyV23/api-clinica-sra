const { Router } = require("express");
const { login,register, getUsuario} = require("../controllers/users.controller");

const router = Router();

/**
 * @route POST /login
 * @desc Iniciar sesión del usuario
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @return {Object} - Objeto JSON que contiene el token de autenticación
 * @throws {Object} - Objeto JSON que contiene un mensaje de error en caso de fallo de autenticación
 */
router.post("/login", login);


/**
 * @route POST /register
 * @desc Registro de usuario
 * @access Público
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @return {Object} - Objeto JSON que contiene el usuario recién registrado y el token de autenticación
 * @throws {Object} - Objeto JSON que contiene un mensaje de error en caso de fallo de registro
 */
router.post("/register", register)


/**
 * @route GET /user
 * @desc Obtener información del usuario actual
 * @access Privado
 * @param {Object} req - Objeto de solicitud de Express con el token de autenticación del usuario
 * @param {Object} res - Objeto de respuesta de Express
 * @return {Object} - Objeto JSON que contiene la información del usuario actual
 * @throws {Object} - Objeto JSON que contiene un mensaje de error en caso de no encontrar la información del usuario o de problemas de autenticación
 */
router.get("/user", getUsuario)

module.exports = router;
