const { Router } = require('express');
const { registrarExamen } = require('../controllers/examenes.controller');
const router = Router();
//Aqui va una ruta 
//ejem: router.get('/getAllUsers', getUsers);

router.post('/registrarExamen/:op',registrarExamen)

module.exports = router;
