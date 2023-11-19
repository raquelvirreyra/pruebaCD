//defino controlador para el manejo de CRUD
const oficinaCtrl = require('./../controllers/oficina.controller');
const autCtrl = require('./../controllers/auth.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/',autCtrl.verifyToken, oficinaCtrl.getOficinas);
router.post('/',autCtrl.verifyToken, oficinaCtrl.createOficina);
router.get('/:id',autCtrl.verifyToken, oficinaCtrl.getOficina);
router.put('/:id',autCtrl.verifyToken, oficinaCtrl.editOficina);

//exportamos el modulo de rutas
module.exports = router;