const reunionCtrl = require('./../controllers/reunion.controller');
const autCtrl = require('./../controllers/auth.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/',autCtrl.verifyToken, reunionCtrl.getReuniones);
router.post('/',autCtrl.verifyToken, reunionCtrl.createReunion);
router.get('/:id', reunionCtrl.getReunion);
router.get('/buscado/:titulo',autCtrl.verifyToken, reunionCtrl.getReunionTitulo);

router.put('/:id',autCtrl.verifyToken, reunionCtrl.editReunion);
router.delete('/:id',autCtrl.verifyToken,reunionCtrl.deleteReunion);
router.put('/:id/recurso/:idrecurso',autCtrl.verifyToken, reunionCtrl.addRecurso);
router.delete('/:id/recurso/:idrecurso',autCtrl.verifyToken,reunionCtrl.deleteRecurso);
router.put('/:id/participante/:idparticipante',autCtrl.verifyToken,reunionCtrl.addParticipante);
router.delete('/:id/participante/:idparticipante',autCtrl.verifyToken,reunionCtrl.deleteParticipante);
/* router.get('/filtro/:p1/:p2/:p3',reunionCtrl.getReunionesFiltro); */
//exportamos el modulo de rutas
module.exports = router;