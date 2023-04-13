const { Schema, model } = require("mongoose");


/**
 * Esquema para la colección de Pacientes en la base de datos
 * @typedef {Object} PacientesSchema
 * @property {String} cedula - Cédula del paciente (requerido)
 * @property {String} nombreCompleto - Nombre completo del paciente (requerido)
 * @property {Array} peso - Array de números que representa el peso del paciente (requerido)
 * @property {Array} presionArterial - Array de números que representa la presión arterial del paciente (requerido)
 * @property {String} edad - Edad del paciente (requerido)
 * @property {String} altura - Altura del paciente (requerido)
 * @property {Array} enfermedades - Array de Strings que representa las enfermedades del paciente (opcional)
 * @property {String} tipoDeSangre - Tipo de sangre del paciente (requerido)
 * @property {Array} medicamentosAlergicos - Array de Strings que representa los medicamentos a los que el paciente es alérgico (opcional)
 * @property {Array} contactoDeEmergencia - Array de Objetos que representa los contactos de emergencia del paciente (requerido, debe contener al menos un contacto de emergencia)
 */
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