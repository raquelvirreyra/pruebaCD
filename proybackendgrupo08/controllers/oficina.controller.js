const Oficina= require ('../models/oficina');
const oficinaCtrl={}

oficinaCtrl.getOficinas= async (req,res)=>{
    var oficinas= await Oficina.find();
    res.json(oficinas);
}
oficinaCtrl.createOficina= async(req,res)=>{
    var oficina=new Oficina(req.body);
    try{
        await oficina.save();
        res.json({
            'status' : '1',
            'msg' : 'Oficina Guardada Correctamente',
        })
    }catch(error){
      res.status(400).json({
        'error' : error,
        'status' : '0',
        'msg': 'Error procesando operacion al guardar una oficina'
      })  

    }
}
oficinaCtrl.getOficina = async(req,res)=>{
    const oficina= await Oficina.findById(req.params.id);
    res.json(oficina);
}
oficinaCtrl.editOficina = async (req, res) => {
    const oficina = new Oficina(req.body);
    try {
    await Oficina.updateOne({_id: req.body._id}, oficina);
    res.json({
    'status': '1',
    'msg': 'Oficina actualizada'
    }) 
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando la operacion'
    }) 
    }
    }


module.exports= oficinaCtrl;