const { request, response } = require("express");
const { error500 } = require("../helpers/resp");
const ExamenSangreModel = require("../models/examenSangre.model");

/**
 * Actualiza los resultados de un examen de sangre en la base de datos.
 * @async
 * @function actualizarSangre
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {string} op - Tipo de examen (en este caso, "sangre").
 * @param {string} cedula - Cédula del paciente al que pertenece el examen.
 * @param {Object} req.body - Objeto que contiene los nuevos resultados del examen.
 * @param {string} req.body.fechaRealizado - Fecha en que se realizó el examen.
 * @param {string} req.body.hemoglobina - Resultado de hemoglobina del examen.
 * @param {string} req.body.hematocrito - Resultado de hematocrito del examen.
 * @param {string} req.body.trigliceridos - Resultado de triglicéridos del examen.
 * @param {string} req.body.colesterolTotal - Resultado de colesterol total del examen.
 * @param {string} req.body.acidoUrico - Resultado de ácido úrico del examen.
 * @param {string} req.body.creatinina - Resultado de creatinina del examen.
 * @returns {Object} Objeto que indica si la operación fue exitosa o no.
 * @throws {Object} Objeto que indica un error interno del servidor.
 */
const actualizarSangre = async (req = request, res = response, op, cedula) => {
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
