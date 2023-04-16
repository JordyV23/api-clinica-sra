const { request, response } = require("express");
const { examenOrina } = require("../models/examenes.model");
const { error500 } = require("../helpers/resp");
const { default: mongoose } = require("mongoose");

const actualizarOrina = async (req = request, res = response, op, cedula) => {
  try {
    const { fechaRealizado, glucosa, eritrocitos, color, leucocitos } =
      req.body;

    const exameModl = mongoose.model("examen", examenOrina);

    // console.log(examenOrina.query)
    // return
    await exameModl.findOneAndUpdate(
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
      { runValidators: true, discriminatorKey: "ExamenOrina" }
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

// idConsulta
// cedulaPaciente
// tipoExamen

// fechaRealizado
// realizado
// glucosa
// eritrocitos
// color
// leucocitos
