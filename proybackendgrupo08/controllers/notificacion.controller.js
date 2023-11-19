const Notificacion = require ('../models/notificacion');

const notificacionCtrl={}

notificacionCtrl.createNotificacion= async (req,res)=>{
    var notificacion= new Notificacion(req.body);
    try{
        await notificacion.save();
        res.json({
            'status' : '1',
            'msg' : 'Notificacion Guardada Correctamente',
        })
    }catch(error){
      res.status(400).json({
        'error' : error,
        'status' : '0',
        'msg': 'Error procesando operacion al guardar una Notificacion'
      })  

    }
}
notificacionCtrl.deleteNotificacion= async(req,res)=>{
    try{
        await Notificacion.deleteMany({reunion: req.params.id});
        res.json({
            status: '1',
            msg: 'Notificacion Borrado'
        })
    }catch(error){
        res.status(400).json({
            'status' : '0',
            'msg' : 'Error procesadon la transaccion'
        })
    }
}

notificacionCtrl.getNotificacionesEmpleado= async (req,res)=>{
    var notificaciones= await Notificacion.find({empleado: req.params.id}).populate('empleado').populate('reunion');
    res.json(notificaciones); 
}
notificacionCtrl.updateLeido= async(req,res)=>{
    const notificacion = new Notificacion(req.body);
    try {
    await Notificacion.updateOne({_id: req.body._id}, notificacion);
    res.json({
    'status': '1',
    'msg': 'notificacion actualizada'
    }) 
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando la operacion'
    }) 
    }
}

module.exports = notificacionCtrl;