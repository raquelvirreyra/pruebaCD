const recursoCtrl = require('./../controllers/recurso.controller');
const autCtrl = require('./../controllers/auth.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/',autCtrl.verifyToken, recursoCtrl.getRecursos);
router.post('/',autCtrl.verifyToken, recursoCtrl.createRecurso);
router.get('/:id',autCtrl.verifyToken, recursoCtrl.getRecurso);
router.put('/:id',autCtrl.verifyToken, recursoCtrl.editRecurso);

//exportamos el modulo de rutas
module.exports = router;