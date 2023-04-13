const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const Pacientes = require("../models/pacientes.model");
const { error500, sinCoincidencias, error400 } = require("../helpers/resp");
const { busqueda } = require("../pacientes/busqueda");


/**
 * Función que registra un nuevo paciente en la base de datos.
 * @function registrarPaciente
 * @async
 * @param {Object} req - objeto request de express que contiene los datos del paciente a registrar.
 * @param {Object} res - objeto response de express que será enviado como respuesta.
 * @returns {Object} objeto con el estado de la respuesta y un mensaje indicando si la acción se ejecutó correctamente.
 * @throws {Error} si ocurre un error al intentar guardar el paciente en la base de datos.
*/
const registrarPaciente = async (req = request, res = response) => {
  try {
    const {
      cedula,
      nombreCompleto,
      peso,
      presionArterial,
      edad,
      altura,
      enfermedades,
      tipoDeSangre,
      medicamentosAlergicos,
      contactoDeEmergencia,
    } = req.body;

    const paciente = new Pacientes({
      cedula,
      nombreCompleto,
      peso,
      presionArterial,
      edad,
      altura,
      enfermedades,
      tipoDeSangre,
      medicamentosAlergicos,
      contactoDeEmergencia,
    });

    await paciente.save();

    return res.status(200).json({
      success: true,
      message: "Paciente agregado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return error500(res, error);
  }
};

/**
 * Obtiene la lista de pacientes registrados en la base de datos.
 * @function obtenerPacientes
 * @async
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @returns {Object} Objeto JSON con el éxito del proceso y los pacientes encontrados.
 * @throws {Object} Objeto JSON con el error ocurrido durante el proceso.
*/
const obtenerPacientes = async (req = request, res = response) => {
  try {
    const pacientes = await Pacientes.find();

    return res.status(200).json({
      success: true,
      message: "Accion Ejecutada con Exito",
      pacientes: pacientes,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};



/**
* Busca pacientes mediante la función busqueda y devuelve una respuesta HTTP con los resultados.
* @async
* @function buscarPaciente
* @param {Object} req - Objeto de solicitud de Express.
* @param {Object} res - Objeto de respuesta de Express.
* @returns {Object} - Objeto JSON con la respuesta HTTP de la búsqueda de pacientes.
* @throws {Error} - Si ocurre algún error durante la búsqueda.
*/
const buscarPaciente = async (req = request, res = response) => {
  try {
    resultado = await busqueda(req, res);
    if (resultado.length < 1) {
      return error400(res, "No se han encontrado pacientes");
    }

    return res.status(200).json({
      success: true,
      message: "Accion Ejecutada con Exito",
      pacientes: resultado,
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

/**
 * Actualiza los datos de un paciente en la base de datos y devuelve una respuesta HTTP con un mensaje de éxito.
 * @async
 * @function actualizarPaciente
 * @param {Object} req - Objeto de solicitud de Express que contiene los datos del paciente a actualizar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Objeto JSON con la respuesta HTTP de la actualización del paciente.
 * @throws {Error} - Si ocurre algún error durante la actualización del paciente.
*/
const actualizarPaciente = async (req = request, res = response) => {
  try {
    const {
      cedula,
      peso,
      presionArterial,
      edad,
      altura,
      enfermedades,
      tipoDeSangre,
      medicamentosAlergicos,
      contactoDeEmergencia,
    } = req.body;

    await Pacientes.updateOne(
      { cedula: cedula },
      {
        $set: {
          peso: peso,
          presionArterial:presionArterial,
          edad: edad,
          altura: altura,
          enfermedades: enfermedades,
          tipoDeSangre: tipoDeSangre,
          medicamentosAlergicos: medicamentosAlergicos,
          contactoDeEmergencia: contactoDeEmergencia,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Paciente actualizado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};


/**
 * Elimina un paciente de la base de datos y devuelve una respuesta HTTP con un mensaje de éxito.
 * @async
 * @function eliminarPaciente
 * @param {Object} req - Objeto de solicitud de Express que contiene el ID del paciente a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} - Objeto JSON con la respuesta HTTP de la eliminación del paciente.
 * @throws {Error} - Si ocurre algún error durante la eliminación del paciente.
*/
const eliminarPaciente = async (req = request, res = response) => {
  try {
    const { cedula } = req.params;
    const paciente = await Pacientes.findOne({ cedula: cedula });

    if (paciente.length === 0) {
      return error400(res, "Este paciente no existe");
    }

    await Pacientes.deleteOne({ cedula: cedula });

    return res.status(200).json({
      success: true,
      message: "Paciente eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return error500(res);
  }
};

module.exports = {
  registrarPaciente,
  obtenerPacientes,
  buscarPaciente,
  eliminarPaciente,
  actualizarPaciente,
};
