const { request, response } = require("express");
const Usuario = require("../models/users.model");
const bcrypt = require("bcryptjs");
const { error400, error500 } = require("../helpers/resp");
const generarJWT = require('../helpers/genJWT')

/**
 * Autentica a un usuario a través de email y contraseña.
 *
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - retorna una response con un success booleano.
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
      token: token
    });
  } catch (error) {
    return error500;
  }
};

/**
 * Registra un usuario en la base de datos
 * @param {*} req - El objeto de solicitud de Express.
 * @param {*} res - El objeto de respuesta de Express.
 * @returns un success booleano, true para un almacenado exitoso y false para un guardado fallido
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

    return res.json({
      success: true,
      message: "Usuario agregado exitosamente",
    });
  } catch (error) {
    return error500;
  }
};

module.exports = {
  login,
  register,
};
