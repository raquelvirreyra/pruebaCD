const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
const autCtrl = require('./../controllers/auth.controller');
// definiendo rutas
router.post('/', usuarioCtrl.createUsuario);
router.get('/',autCtrl.verifyToken, usuarioCtrl.getUsuarios);
router.post('/login', usuarioCtrl.loginUsuario);
//exportacion del modulo de rutas
module.exports = router;