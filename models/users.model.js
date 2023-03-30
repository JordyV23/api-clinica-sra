const { Schema, model } = require("mongoose");

/**
 * @typedef {Object} Usuario
 * @property {string} cedula - La cédula del usuario.
 * @property {string} nombre - El nombre del usuario.
 * @property {string} apellidos - Los apellidos del usuario.
 * @property {string} email - El correo electrónico del usuario.
 * @property {string} password - La contraseña del usuario.
 * @property {boolean} google - Indica si el usuario se autenticó con Google.
 * @property {string} telefono - El número de teléfono del usuario.
 * @property {Date} fechaNacimiento - La fecha de nacimiento del usuario.
 * @property {string} rol - El rol del usuario en la aplicación.
 * @property {boolean} estado - Indica si la cuenta del usuario está activa o no.
*/

const SchemaUsuario = new Schema({
  cedula: {
    type: String,
    required: [true, "El campo cedula es requerido"],
  },

  nombre: {
    type: String,
    required: [true, "El campo nombre es requerido"],
  },

  apellidos: {
    type: String,
    required: [true, "El campo apellido es requerido"],
  },

  email: {
    type: String,
    required: [true, "El campo email es requerido"],
  },

  password: {
    type: String,
    required: [true, "El campo password es requerido"],
  },

  google: {
    type: Boolean,
    default: false,
  },

  telefono: {
    type: String,
    required: [true, "El campo telefono es requerido"],
  },

  fechaNacimiento: {
    type: Date,
    required: [true,"La fecha de nacimiento es requerida"]
  },

  rol: {
    type: String,
    default: "Public",
  },

  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("user", SchemaUsuario);
