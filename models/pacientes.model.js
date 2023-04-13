const { Schema, model } = require("mongoose");

const SchemaPacientes = new Schema({
    cedula: {
      type: String,
      required: [true, "El campo cedula es obligatorio"],
    },
    nombreCompleto: {
      type: String,
      required: [true, "El campo nombreCompleto es obligatorio"],
    },
    peso: {
      type: Schema.Types.Array,
      required: [true, "El campo peso es obligatorio"],
    },
    presionArterial: {
      type: Schema.Types.Array,
      required: [true, "El campo presionArterial es obligatorio"],
    },
    edad: {
      type: String,
      required: [true, "El campo edad es obligatorio"],
    },
    altura: {
      type: String,
      required: [true, "El campo altura es obligatorio"],
    },
    enfermedades: {
      type: Schema.Types.Array,
      required: false,
    },
    tipoDeSangre: {
        type: String,
        required: [true, "El campo tipoDeSangre es obligatorio"],
    },
    medicamentosAlergicos: {
        type: Schema.Types.Array,
        required: false,
    },
    contactoDeEmergencia: {
      type: Schema.Types.Array,
      isArray:true,
      notEmpty: true,
      required: [true, "El campo contactoDeEmergencia es obligatorio, debe de tener al menos un contacto de emergencia"],
    },

  });

module.exports = model("paciente", SchemaPacientes);