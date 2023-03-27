const mongoose = require("mongoose");

/**
 * funcion para realizar la conexion a mongodb
 */
const conectorMONGO = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MongoDB);
    console.log("La conexion a mongodb fue exitosa");
  } catch (err) {
    console.log(err);
    throw new Error("Error en la conexion a la base de datos");
  }
};

module.exports = conectorMONGO;
