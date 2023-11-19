const Recurso= require ('../models/recurso');
const recursoCtrl={}

recursoCtrl.getRecursos= async (req,res)=>{
    var recursos= await Recurso.find();
    res.json(recursos);
}
recursoCtrl.createRecurso= async(req,res)=>{
    var recurso=new Recurso(req.body);
    try{
        await recurso.save();
        res.json({
            'status' : '1',
            'msg' : 'Recurso Guardada Correctamente',
        })
    }catch(error){
      res.status(400).json({
        'error' : error,
        'status' : '0',
        'msg': 'Error procesando operacion al guardar un Recurso'
      })  

    }
}
recursoCtrl.getRecurso = async(req,res)=>{
    const recurso= await Recurso.findById(req.params.id);
    res.json(recurso);
}
recursoCtrl.editRecurso = async (req, res) => {
    const recurso = new Recurso(req.body);
    try {
    await Recurso.updateOne({_id: req.body._id}, recurso);
    res.json({
    'status': '1',
    'msg': 'Recurso actualizado'
    }) 
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando la operacion'
    }) 
    }
    
    }


module.exports= recursoCtrl;