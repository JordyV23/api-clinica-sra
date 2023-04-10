const { Schema, model } = require("mongoose");
const usersModel = require("./users.model");

const SchemaPacientes = new Schema({
    idUsuario: {
      type: Schema.Types.ObjectId,
      ref: usersModel,
      required: [true, "El campo idUsuario es obligatorio"],
    },
    peso: {
      type: String,
      required: [true, "El campo peso es obligatorio"],
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
      required: [true, "El campo contactoDeEmergencia es obligatorio"],
    },

  });

module.exports = model("paciente", SchemaPacientes);