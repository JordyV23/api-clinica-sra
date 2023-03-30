/**
 * Retorna una respuesta HTTP con un código 500 indicando que ha ocurrido un error en el servidor.
 * @function
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Error} error - Objeto de error que ocurrió.
 * @returns {Object} Objeto de respuesta HTTP.
 */
const error500 = (res, error) => {
  return res.status(500).json({
    success: false,
    message: "Ha ocurrido un error en el servidor",
    error: error,
  });
};


/**
* Retorna una respuesta HTTP con un código 400 indicando que las credenciales proporcionadas son inválidas.
* @function
* @param {Object} res - Objeto de respuesta HTTP.
* @param {string} msg - Mensaje de error personalizado. Por defecto es "Credenciales Inválidas".
* @returns {Object} Objeto de respuesta HTTP.
*/
const error400 = (res, msg = "Credenciales Invalidas") => {
  return res.status(400).json({
    success: false,
    msg: msg,
  });
};


/**
 * Retorna una respuesta HTTP con un código 200 indicando que no hay datos para mostrar.
 * @function
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {string} msg - Mensaje personalizado. Por defecto es "No hay datos para mostrar".
 * @returns {Object} Objeto de respuesta HTTP.
 */
const sinCoincidencias = (res, msg = "No hay datos para mostrar") => {
  return res.status(200).json({
    success: true,
    msg: msg,
  });
};

module.exports = {
  error500,
  error400,
  sinCoincidencias,
};
