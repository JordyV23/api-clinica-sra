const { Schema, model } = require("mongoose");
const consultaModel = require("./consultas.model");

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

module.exports = model("examen", SchemaExamenSangre);
