const jwt = require("jsonwebtoken");

/**
* Genera un token JWT para un usuario con el ID especificado.
* @function
* @param {string} id - ID del usuario para el cual se generará el token.
* @returns {Promise<string>} Promesa que se resuelve con el token JWT generado.
* @throws {string} Mensaje de error si no se pudo generar el token.
*/
const generarJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    const options = {
      expiresIn: "4h",
    };
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, options, (err, token) => {
      //convertirlo en operador ternario
      if (err) {
        console.log(err)
        reject("No se pudo generar el token");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports =  generarJWT ;
