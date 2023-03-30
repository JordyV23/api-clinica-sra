const { request, response } = require("express");
const { error500, sinCoincidencias } = require("../helpers/resp");
const citas = require("../models/citas.model");

const getCitas = async (req = request, res = response) => {
  try {
    const citasDisponibles = await citas.find({ disponible: true });
    if (!citasDisponibles) {
      return sinCoincidencias(res);
    }
    console.log(citasDisponibles);
    return res.status(200).json({
      success: true,
      citas: citasDisponibles,
    });
  } catch (error) {
    console.log(error);
    return error500(res, error);
  }
};

module.exports = {
  getCitas,
};
