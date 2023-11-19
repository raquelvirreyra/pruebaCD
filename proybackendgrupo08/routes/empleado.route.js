//defino controlador para el manejo de CRUD
const empleadoCtrl = require('./../controllers/empleado.controller');
const autCtrl = require('./../controllers/auth.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de agente
router.get('/', empleadoCtrl.getEmpleados);
router.post('/',autCtrl.verifyToken, empleadoCtrl.createEmpleado);
router.get('/:id',autCtrl.verifyToken, empleadoCtrl.getEmpleado);
router.put('/:id',autCtrl.verifyToken, empleadoCtrl.editEmpleado);
router.delete('/:id',autCtrl.verifyToken, empleadoCtrl.deleteEmpleado);
router.put('/:id/dependencia/:idDependencia',autCtrl.verifyToken, empleadoCtrl.addDependencia);
//exportamos el modulo de rutas
module.exports = router;