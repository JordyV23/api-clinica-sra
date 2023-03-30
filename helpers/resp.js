const error500 = (res, error) => {
  return res.status(500).json({
    success: false,
    message: "Ha ocurrido un error en el servidor",
    error: error,
  });
};

const error400 = (res, msg = "Credenciales Invalidas") => {
  return res.status(400).json({
    success: false,
    msg: msg,
  });
};

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
