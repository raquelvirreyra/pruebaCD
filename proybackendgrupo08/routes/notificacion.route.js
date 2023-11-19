const notificacionCtrl = require ('../controllers/notificacion.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();
router.get('/:id',autCtrl.verifyToken, notificacionCtrl.getNotificacionesEmpleado);
router.post('/', autCtrl.verifyToken,notificacionCtrl.createNotificacion);
router.delete('/:id',autCtrl.verifyToken, notificacionCtrl.deleteNotificacion);
router.put('/:id',autCtrl.verifyToken,notificacionCtrl.updateLeido);

module.exports = router;