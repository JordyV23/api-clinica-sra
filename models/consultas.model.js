const { Schema, model } = require("mongoose");


/** 
 * Definición del esquema de Consultas. 
 * @typedef {object} ConsultasSchema 
 * @property {string} cedulaPaciente - Cédula del paciente asociado a la consulta. 
 * @property {string} nombrePaciente - Nombre del paciente asociado a la consulta. 
 * @property {Array<number>} peso - Peso del paciente en la consulta. 
 * @property {Array<number>} presionArterial - Presión arterial del paciente en la consulta. 
 * @property {string} altura - Altura del paciente en la consulta. 
 * @property {string} sintomas - Síntomas presentados por el paciente en la consulta. 
 * @property {string} diagnostico - Diagnóstico otorgado por el médico en la consulta. 
 * @property {Array<string>} medicamentos - Medicamentos prescritos al paciente en la consulta. 
 * @property {Array<string>} examenes - Exámenes solicitados al paciente en la consulta. 
 * @property {boolean} finalizada - Indicador de si la consulta ha sido finalizada.
*/

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