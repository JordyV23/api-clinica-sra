const { Schema, model } = require("mongoose");
const consultaModel = require("./consultas.model");

/**
 * @typedef {Object} SchemaExamenOrina
 * @property {Schema.Types.ObjectId} idConsulta - ID de la consulta a la que se refiere el examen de orina
 * @property {string} cedulaPaciente - Cédula del paciente al que se le realizó el examen de orina
 * @property {string} tipoExamen - Tipo de examen realizado ("Sangre", "Orina", etc.)
 * @property {string} fechaRealizado - Fecha en la que se realizó el examen de orina
 * @property {boolean} realizado - Indica si el examen de orina fue realizado o no
 * @property {string} glucosa - Resultado del nivel de glucosa en el examen de orina
 * @property {string} eritrocitos - Resultado del nivel de eritrocitos en el examen de orina
 * @property {string} color - Resultado del color en el examen de orina
 * @property {string} leucocitos - Resultado del nivel de leucocitos en el examen de orina
 */
const SchemaExamenOrina = new Schema({
  idConsulta: {
    type: Schema.Types.ObjectId,
    ref: consultaModel,
    required: [true, "El campo idConsulta es requerido"],
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
    required: [true, "El campo fechaRealizado es requerido"],
  },
  realizado: {
    type: Boolean,
    required: [true, "El campo realizado es requerido"],
  },
  glucosa: {
    type: String,
    required: [true, "El campo glucosa es requerido"],
  },
  eritrocitos: {
    type: String,
    required: [true, "El campo eritrocitos es requerido"],
  },
  color: {
    type: String,
    required: [true, "El campo color es requerido"],
  },
  leucocitos: {
    type: String,
    required: [true, "El campo leucocitos es requerido"],
  },
});

module.exports = model("orinaExamen", SchemaExamenOrina);
