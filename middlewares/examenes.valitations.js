const User = require("../models/users.model");
const { error500, error400 } = require("../helpers/resp");
const jwt = require("jsonwebtoken");

const validateRol = async (req = request, res = response, next) => {
  try {
    const token = req.header("user-token");
    if (!token) {
      return error400(res, "Debe autenticarse");
    }

    const { payload } = jwt.decode(token, { complete: true });
    const user = await User.findById(payload.id);
    if (user.rol === "Public") {
      return error400(
        res,
        'El usuario no tiene los permisos para acceder a esta ruta'
      );
    }
  } catch (err) {
    console.log(err);
    return error500(res, "Algo salio mal a la hora de validar el token");
  }
  next();
};

module.exports = { validateRol };
