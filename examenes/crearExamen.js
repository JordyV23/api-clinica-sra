const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const examenSangreModel = require("../models/examenSangre.model");
const examenOrinaModel = require("../models/examenOrina.model");

/**
 * Crea los exámenes correspondientes a una consulta.
 *
 * @param {object} res - El objeto response de Express.
 * @param {object} consulta - Un objeto con la información de la consulta.
 * @param {string} consulta._id - El ID de la consulta.
 * @param {string} consulta.cedulaPaciente - La cédula del paciente asociado a la consulta.
 * @param {Array} consulta.examenes - Un arreglo con los exámenes solicitados en la consulta.
 * @param {string} consulta.examenes[].sangre - Indica si se solicitó el examen de sangre ("Si" o "No").
 * @param {string} consulta.examenes[].orina - Indica si se solicitó el examen de orina ("Si" o "No").
 *
 * @returns {Promise<void>} - Una promesa que no retorna nada.
 */
const crearExamenes = async (res, consulta) => {
  try {
    const { examenes, _id, cedulaPaciente } = consulta;

    if (examenes[0].sangre === "Si") {
      const sangre = new examenSangreModel({
        idConsulta: _id,
        cedulaPaciente: cedulaPaciente,
        tipoExamen: "Sangre",
        fechaRealizado: "-",
        realizado: false,
        hemoglobina: "-",
        hematocrito: "-",
        trigliceridos: "-",
        colesterolTotal: "-",
        acidoUrico: "-",
        creatinina: "-",
      });
      await sangre.save();
    }

    if (examenes[0].orina === "Si") {
      const orina = new examenOrinaModel({
        idConsulta: _id,
        cedulaPaciente: cedulaPaciente,
        tipoExamen: "Sangre",
        fechaRealizado: "-",
        realizado: false,
        glucosa: "-",
        eritrocitos: "-",
        color: "-",
        leucocitos: "-",
      });
      await orina.save();
    }
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

module.exports = {
  crearExamenes,
};
