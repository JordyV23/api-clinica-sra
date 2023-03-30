const { Schema, model } = require("mongoose");
const medicosModel = require("./medicos.model");
const usersModel = require("./users.model");

/**
 * SchemaCitas permite realizar consultas a mongodb a traves de mongoose
 */
const SchemaCitas = new Schema({
  idMedico: {
    type: Schema.Types.ObjectId,
    ref: medicosModel,
    required: [true, "El campo idMedico es obligatorio"],
  },
  nombreMedico: {
    type: String,
    required: [true, "El campo nombreMedico es obligatorio"],
  },
  especialidad: {
    type: String,
    required: [true, "El campo especialidad es obligatorio"],
  },
  fecha: {
    type: String,
    required: [true, "El campo fecha es obligatorio"],
  },
  hora: {
    type: String,
    required: [true, "El campo hora es obligatorio"],
  },
  idPaciente: {
    type: Schema.Types.ObjectId,
    ref: usersModel,
    required: [true, "El campo idPaciente es obligatorio"],
  },
  nombreCompleto: {
    type: String,
    required: [true, "El campo nombreCompleto es obligatorio"],
  },
  telefono: {
    type: String,
    required: [true, "El campo telefono es obligatorio"],
  },
  disponible: {
    type: Boolean,
    required: [true, "El campo disponible es obligatorio"],
  },
});

module.exports = model("cita", SchemaCitas);
