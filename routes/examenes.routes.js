const { Router } = require('express');
const { registrarExamen, getOneExamen } = require('../controllers/examenes.controller');
const router = Router();

router.post('/registrarExamen/:op',registrarExamen)

router.get('/getExamen/:op',getOneExamen)

module.exports = router;
