const { Schema, model } = require("mongoose");

const SchemaConsultas = new Schema({
    cedulaPaciente: {
      type: String,
      required: [true, "El campo cedulaPaciente es obligatorio"],
    },
    nombrePaciente: {
      type: String,
      required: [true, "El campo nombrePaciente es obligatorio"],
    },
    peso: {
      type: Schema.Types.Array,
      required: [true, "El campo peso es obligatorio"],
    },
    presionArterial: {
      type: Schema.Types.Array,
      required: [true, "El campo presionArterial es obligatorio"],
    },
    altura: {
      type: String,
      required: [true, "El campo altura es obligatorio"],
    },
    sintomas: {
      type: String,
      required: [true, "El campo sintomas es obligatorio"],
    },
    diagnostico: {
        type: String,
        required: [true, "El campo diagnostico es obligatorio"],
    },
    medicamentos: {
        type: Schema.Types.Array,
        required: [true, "El campo medicamentos es obligatorio"],
    },
    examenes: {
        type: Schema.Types.Array,
        required: [true, "El campo examenes es obligatorio"],
    },
    finalizada:{
        type:Boolean,
        default: false,
    },
  });

module.exports = model("consulta", SchemaConsultas);