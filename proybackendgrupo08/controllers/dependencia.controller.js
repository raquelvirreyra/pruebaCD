
const Dependencia = require('../models/dependencia');
const dependenciaCtrl = {}

 dependenciaCtrl.createDependencia = async (req, res) => {
    var dependencia = new Dependencia(req.body);
    try {
        await dependencia.save();
        res.json({
        'status': '1',
        'msg': 'Dependencia guardado.'})
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando operacion.'})
    }
}

dependenciaCtrl.getDependencias=async (req,res)=>{
    var dependencias = await Dependencia.find();
    res.json(dependencias);
}


module.exports = dependenciaCtrl;