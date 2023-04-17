const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const ExamenOrinaModel = require("../models/examenOrina.model");

const actualizarOrina = async (req = request, res = response, op, cedula) => {
  try {
    const { fechaRealizado, glucosa, eritrocitos, color, leucocitos } =
      req.body;

    console.log(fechaRealizado, glucosa, eritrocitos, color, leucocitos);

    // const exam = await ExamenOrinaModel.findOne({cedulaPaciente: cedula, realizado: false, tipoExamen: op})
    // console.log(exam)

     await ExamenOrinaModel.findOneAndUpdate(
      { cedulaPaciente: cedula, realizado: false, tipoExamen: op },
      {
        $set: {
          fechaRealizado: fechaRealizado,
          realizado: true,
          glucosa: glucosa,
          eritrocitos: eritrocitos,
          color: color,
          leucocitos: leucocitos,
        },
      },
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

module.exports = { actualizarOrina };
