const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generarJWT = require("../helpers/genJWT");
const Usuario = require("../models/users.model");
const { request, response } = require("express");
const { error400, error500 } = require("../helpers/resp");

/**
 * Autentica a un usuario y genera un token JWT para su sesion.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud express con datos de usuario.
 * @param {Object} res - Objeto de respuesta express.
 * @returns {Object} Respuesta de JSON con token JWT de autenticacion.
 * @throws {Object} Error de servidor.
 */
const login = async (req = request, res = response) => {
  try {
    const { password, email } = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) {
      return error400(res);
    }
    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) {
      return error400(res);
    }
    const token = await generarJWT(user._id);
    return res.status(200).json({
      success: true,
      msg: "Autenticacion Exitosa",
      token: token,
    });
  } catch (error) {
    return error500(res,error);
  }
};

/**
 * Registra un nuevo usuario en el sistema.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud express con datos de usuario a registrar.
 * @param {Object} res - Objeto de respuesta express.
 * @returns {Object} Respuesta de JSON con mensaje de exito al agregar usuario.
 * @throws {Object} Error de servidor.
 */
const register = async (req = request, res = response) => {
  try {
    const {
      cedula,
      nombre,
      apellidos,
      email,
      password,
      telefono,
      fechaNacimiento,
    } = req.body;
    const user = new Usuario({
      cedula,
      nombre,
      apellidos,
      email,
      password,
      telefono,
      fechaNacimiento,
    });
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Usuario agregado exitosamente",
    });
  } catch (error) {
    return error500(res,error);
  }
};

/**
 * Obtiene el usuario autenticado actualmente.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} Objeto JSON con los datos del usuario autenticado.
 * @throws {Object} Objeto JSON que indica un error interno del servidor o de autenticación del usuario.
 */
const getUsuario = async (req = request, res = response) => {
  try {
    const token = req.header("user-token");
    if (!token) {
      return error400("El usuario debe autenticarse");
    }
    const { payload } = jwt.decode(token, { complete: true });
    const user = await Usuario.findById(payload.id);
    if (!user) {
      return error500(res,error);
    }
    return res.status(200).json({
      success: true,
      nombreCompleto: `${user.nombre} ${user.apellidos}`,
    });
  } catch (error) {
    return error500(res,error);
  }
};

module.exports = {
  login,
  register,
  getUsuario,
};
