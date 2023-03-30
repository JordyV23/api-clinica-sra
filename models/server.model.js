const express = require("express");
const cors = require("cors");
require("dotenv").config();
const conectorMONGO = require("../database/mongo.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathClinica = "/clinica";
    this.pathCitas = "/citas";
    this.middleWares();
    this.routes();
    this.MongoDB();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `El servidor esta corriendo en el puerto http://localhost:${this.port}${this.pathClinica}`
      );
    });
  }

  routes() {
    this.app.use(this.pathClinica, require("../routes/users.routes"));
    this.app.use(this.pathCitas, require("../routes/citas.routes"));
  }

  middleWares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  MongoDB() {
    conectorMONGO();
  }
}

module.exports = Server;
