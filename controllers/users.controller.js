const { request, response } = require("express");
const Usuario = require("../models/users.model");

/**
 * Autentica a un usuario a través de email y contraseña.
 *
 * @param {Request} req - El objeto de solicitud de Express.
 * @param {Response} res - El objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que no devuelve nada.
 */
const login = async (req = request, res = response) => {
  try {
    const { password, email } = req.body;

    const user = await Usuario.findOne({ email, password });

    if (user) {
      return res.status(200).json({
        success: true,
        msg: "Autenticacion Exitosa",
        user,
      });
    }

    return res.status(400).json({
      success: false,
      msg: "Credenciales Invalidas",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ha ocurrido un error en el servidor",
    });
  }
};

module.exports = {
  login,
};
