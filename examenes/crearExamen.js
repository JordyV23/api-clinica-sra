const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const examenSangreModel = require("../models/examenSangre.model");
const examenOrinaModel = require("../models/examenOrina.model");

const crearExamenes = async (res, consulta) => {
  try {
    const { examenes, _id, cedulaPaciente } = consulta;

    if (examenes[0].sangre === "Si") {
      const sangre = new examenSangreModel({
        idConsulta:_id,
        cedulaPaciente:cedulaPaciente,
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
        idConsulta:_id,
        cedulaPaciente:cedulaPaciente,
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
