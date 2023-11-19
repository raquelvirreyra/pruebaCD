//defino controlador para el manejo de CRUD
let correoCtrl = require('./../controllers/correo.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.post('/', correoCtrl.enviarCorreo);
//exportamos el modulo de rutas
module.exports = router;