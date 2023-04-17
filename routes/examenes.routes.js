const { Router } = require('express');
const { registrarExamen, getOneExamen, getTodosExamen } = require('../controllers/examenes.controller');
const router = Router();

router.post('/registrarExamen/:op',registrarExamen)

router.get('/getExamen/:op',getOneExamen)

router.get('/getAll/:op', getTodosExamen)

module.exports = router;
