const { Schema, model } = require("mongoose");
const usersModel = require("./users.model");

/**
 * Esquema de la colección "medicos" en la base de datos.
 * @typedef {Object} SchemaMedico
 * @property {Schema.Types.ObjectId} idUsuario - El ID del usuario que representa al médico en el sistema.
 * @property {String} nombreMedico - El nombre completo del médico.
 * @property {String} especialidad - La especialidad médica del médico.
 * @property {Object} horario - El horario de trabajo del médico.
 * @property {String} horario.entrada - La hora de entrada del médico al consultorio.
 * @property {String} horario.salida - La hora de salida del médico del consultorio.
*/
const SchemaMedico = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: usersModel,
    required: [true, "El campo de idUsuario es obligatorio"],
  },
  nombreMedico: {
    type: String,
    required: [true, "El campo de nombreMedico es obligatorio"],
  },
  especialidad: {
    type: String,
    required: [true, "El campo de especialidad es obligatorio"],
  },
  horario: {
    entrada: {
      type: String,
      required: [true, "El campo entrada de es obligatorio"]
    },
    salida: { 
        type: String,
        required: [true, "El campo salida de es obligatorio"] 
    },
  },
});

module.exports = model("medico", SchemaMedico);
