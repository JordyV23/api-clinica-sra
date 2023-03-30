const jwt = require("jsonwebtoken");

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
