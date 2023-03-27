const { Schema, model } = require("mongoose");

/**
 * SchemaUsuario permite realizar consultas a mongodb a traves de mongoose
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
    default: "public",
  },

  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("user", SchemaUsuario);
