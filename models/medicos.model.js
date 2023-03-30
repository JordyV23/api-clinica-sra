const { Schema, model } = require("mongoose");
const usersModel = require("./users.model");

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
