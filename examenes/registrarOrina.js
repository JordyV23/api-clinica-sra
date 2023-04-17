const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const ExamenOrinaModel = require("../models/examenOrina.model");

/**
 * Actualiza los resultados de un examen de orina en la base de datos.
 * @async
 * @function actualizarOrina
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {string} op - Tipo de examen (en este caso, "orina").
 * @param {string} cedula - Cédula del paciente al que pertenece el examen.
 * @param {Object} req.body - Objeto que contiene los nuevos resultados del examen.
 * @param {string} req.body.fechaRealizado - Fecha en que se realizó el examen.
 * @param {string} req.body.glucosa - Resultado de glucosa del examen.
 * @param {string} req.body.eritrocitos - Resultado de eritrocitos del examen.
 * @param {string} req.body.color - Resultado de color del examen.
 * @param {string} req.body.leucocitos - Resultado de leucocitos del examen.
 * @returns {Object} Objeto que indica si la operación fue exitosa o no.
 * @throws {Object} Objeto que indica un error interno del servidor.
 */
const actualizarOrina = async (req = request, res = response, op, cedula) => {
  try {
    const { fechaRealizado, glucosa, eritrocitos, color, leucocitos } =
      req.body;
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

module.exports = { actualizarOrina };
