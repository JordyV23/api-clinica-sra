const { Schema, model } = require("mongoose");
const medicosModel = require("./medicos.model");
const usersModel = require("./users.model");

/**
 * Esquema de la colección "citas" en la base de datos.
 * @typedef {Object} SchemaCitas
 * @property {Schema.Types.ObjectId} idMedico - El ID del médico asignado a la cita.
 * @property {String} nombreMedico - El nombre completo del médico asignado a la cita.
 * @property {String} especialidad - La especialidad del médico asignado a la cita.
 * @property {String} fecha - La fecha de la cita.
 * @property {String} hora - La hora de la cita.
 * @property {Schema.Types.ObjectId} idPaciente - El ID del paciente que reservó la cita.
 * @property {String} nombreCompleto - El nombre completo del paciente que reservó la cita.
 * @property {String} telefono - El número de teléfono del paciente que reservó la cita.
 * @property {Boolean} disponible - Indica si la cita está disponible o no para ser reservada.
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
