const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generarJWT = require("../helpers/genJWT");
const Usuario = require("../models/users.model");
const { request, response } = require("express");
const { error400, error500 } = require("../helpers/resp");
const { googleVerify } = require("../helpers/googleVerify");

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
      rol: user.rol,
    });
  } catch (error) {
    return error500(res, error);
  }
};

/**
 * Función asincrónica que maneja la autenticación del usuario mediante Google.
 * @async
 * @function loginGoogle
 * @param {Object} req Objeto de solicitud HTTP (por defecto: request).
 * @param {Object} res Objeto de respuesta HTTP (por defecto: response).
 * @returns {Object} Objeto de respuesta HTTP con el resultado de la autenticación.
 * @throws {Error} Error 500 - Error interno del servidor.
*/
const loginGoogle = async (req = request, res = response) => {
  try {
    const { id_token } = req.body;

    const googleUser = await googleVerify(id_token);
    const { nombre, email, apellido } = googleUser;

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      const data = {
        cedula: "Pendiente",
        nombre: nombre,
        apellidos: apellido,
        email: email,
        password: process.env.GOOGLE_SECRET,
        telefono: "Pendiente",
        fechaNacimiento: "11-04-2023",
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    const token = await generarJWT(usuario.id);

    return res.status(200).json({
      success: true,
      msg: "Autenticacion Exitosa",
      token: token,
      rol: usuario.rol,
    });
  } catch (err) {
    console.log(err);
    return error500(res);
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
    return error500(res, error);
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
      return error500(res, error);
    }
    return res.status(200).json({
      success: true,
      nombreCompleto: `${user.nombre} ${user.apellidos}`,
    });
  } catch (error) {
    return error500(res, error);
  }
};

module.exports = {
  login,
  loginGoogle,
  register,
  getUsuario,
};
