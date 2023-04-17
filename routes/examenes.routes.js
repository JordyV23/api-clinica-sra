const { Router } = require('express');
const { registrarExamen, getOneExamen, getTodosExamen, getTodosPorTipo } = require('../controllers/examenes.controller');
const router = Router();

router.post('/registrarExamen/:op',registrarExamen)

router.get('/getExamen/:op',getOneExamen)

router.get('/getAll/:op', getTodosExamen)

// ProbarEsta ruta
router.get('/getAll/:op/:tipo', getTodosPorTipo)

module.exports = router;
