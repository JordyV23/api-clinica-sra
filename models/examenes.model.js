const { Schema, model } = require("mongoose");

const SchemaExamen = new Schema({
  idConsulta: {
    type: Schema.Types.ObjectId,
    required: [true, "El campo idConsulta es requerido"],
  },
  cedulaPaciente: {
    type: String,
    required: [true, "El campo cedulaPaciente es requerido"],
  },
  fechaRealizado: {
    type: String,
    required: [true, "El campo fechaRealizado es requerido"],
  },
  realizado: {
    type: Boolean,
    required: [true, "El campo realizado es requerido"],
  },
  tipoExamen: {
    type: String,
    required: [true, "El campo tipoExamen es requerido"],
  },
});

const examenSangreSchema = new Schema({
  hemoglobina: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  hematocrito: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  trigliceridos: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  colesterolTotal: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  acidoUrico: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  creatinina: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
});

const examenOrinaSchema = new Schema({
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

const examenSangre = SchemaExamen.discriminator(
  "ExamenSangre",
  examenSangreSchema
);
const examenOrina = SchemaExamen.discriminator(
  "ExamenOrina",
  examenOrinaSchema
);

module.exports = {
  examenSangre,
  examenOrina,
};
