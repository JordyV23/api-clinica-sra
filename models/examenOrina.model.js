const { Schema, model } = require("mongoose");
const consultaModel = require("./consultas.model");

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
