const express = require("express");
const cors = require("cors");
const listEndpoints = require('express-list-endpoints')
require("dotenv").config();
const conectorMONGO = require("../database/mongo.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathClinica = "/clinica";
    this.pathCitas = "/citas";
    this.pathPacientes = "/pacientes"
    this.pathConsultas = "/consultas"
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
    this.app.use(this.pathPacientes, require("../routes/pacientes.routes"))
    this.app.use(this.pathConsultas, require('../routes/consultas.routes'))
    console.log(listEndpoints(this.app));
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
