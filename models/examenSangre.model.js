const { Schema, model } = require("mongoose");
const consultaModel = require("./consultas.model");

/**
 * Modelo para un examen de sangre 
 * @typedef {Object} ExamenSangre 
 * @property {string} idConsulta - El ID de la consulta asociada al examen 
 * @property {string} cedulaPaciente - La cédula del paciente que realizó el examen 
 * @property {string} tipoExamen - El tipo de examen realizado 
 * @property {string} fechaRealizado - La fecha en que se realizó el examen 
 * @property {boolean} realizado - Indica si el examen ya fue realizado o no 
 * @property {string} hemoglobina - El valor de hemoglobina obtenido en el examen 
 * @property {string} hematocrito - El valor de hematocrito obtenido en el examen 
 * @property {string} trigliceridos - El valor de triglicéridos obtenido en el examen 
 * @property {string} colesterolTotal - El valor de colesterol total obtenido en el examen 
 * @property {string} acidoUrico - El valor de ácido úrico obtenido en el examen 
 * @property {string} creatinina - El valor de creatinina obtenido en el examen
*/

const SchemaExamenSangre = new Schema({
  idConsulta: {
    type: Schema.Types.ObjectId,
    ref: consultaModel,
    required: [true, "El campo idConsulta es obligatorio"],
  },
  cedulaPaciente: {
    type: String,
    required: [true, "El campo cedulaPaciente es obligatorio"],
  },
  tipoExamen: {
    type: String,
    required: [true, "El campo tipoExamen es obligatorio"],
  },
  fechaRealizado: {
    type: String,
    required: [true, "El campo fechaRealizado es obligatorio"],
  },
  realizado: {
    type: Boolean,
    required: [true, "El campo realizado es obligatorio"],
  },
  hemoglobina: {
    type: String,
    required: [true, "El campo hemoglobina es obligatorio"],
  },
  hematocrito: {
    type: String,
    required: [true, "El campo hematocrito es obligatorio"],
  },
  trigliceridos: {
    type: String,
    required: [true, "El campo trigliceridos es obligatorio"],
  },
  colesterolTotal: {
    type: String,
    required: [true, "El campo colesterolTotal es obligatorio"],
  },
  acidoUrico: {
    type: String,
    required: [true, "El campo acidoUrico es obligatorio"],
  },
  creatinina: {
    type: String,
    required: [true, "El campo creatinina es obligatorio"],
  },
});

module.exports = model("sangreExamen", SchemaExamenSangre);
