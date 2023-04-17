const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const ExamenSangreModel = require("../models/examenSangre.model");

const actualizarSangre = async (req = request, res = response, op, cedula) => {
  // idConsulta
  // cedulaPaciente
  // tipoExamen

  // fechaRealizado
  // realizado

  // hemoglobina
  // hematocrito
  // trigliceridos
  // colesterolTotal
  // acidoUrico
  // creatinina

  try {
    const {
      fechaRealizado,
      hemoglobina,
      hematocrito,
      trigliceridos,
      colesterolTotal,
      acidoUrico,
      creatinina,
    } = req.body;

    await ExamenSangreModel.findOneAndUpdate(
      { cedulaPaciente: cedula, realizado: false, tipoExamen: op },
      {
        $set: {
          fechaRealizado: fechaRealizado,
          realizado: true,
          hemoglobina: hemoglobina,
          hematocrito: hematocrito,
          trigliceridos: trigliceridos,
          colesterolTotal: colesterolTotal,
          acidoUrico: acidoUrico,
          creatinina: creatinina,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Examen registrado exitosamente",
    });
  } catch (error) {
    console.log(error);
    error500(res);
  }
};

module.exports = { actualizarSangre };
