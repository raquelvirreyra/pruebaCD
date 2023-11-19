//defino controlador para el manejo de CRUD
const dependenciaCtrl = require('./../controllers/dependencia.controller');
const autCtrl = require('./../controllers/auth.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.post('/', dependenciaCtrl.createDependencia);
router.get('/',autCtrl.verifyToken,dependenciaCtrl.getDependencias);
//exportamos el modulo de rutas
module.exports = router;