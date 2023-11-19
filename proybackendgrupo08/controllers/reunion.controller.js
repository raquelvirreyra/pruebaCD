const Reunion= require ('../models/reunion');
const Recurso= require ('../models/recurso')
const Participante= require ('../models/empleado');
const reunionCtrl={}

reunionCtrl.getReuniones= async (req,res)=>{
    var reunion= await Reunion.find().populate('recursos').populate('oficina').populate('participantes');
    res.json(reunion);
}


reunionCtrl.getReunionTitulo = async (req, res) => {
    /* var criteria={};
    if(req.query.titulo!=null && req.query.titulo!=""){
       criteria.titulo=req.query.titulo;
    }
    {'monedaOrigen':ars,'monedaDestino':usd};
    var buscado = await Reunion.find(criteria); */
    var buscado = await Reunion.find({titulo:req.params.titulo}).populate('recursos').populate('oficina').populate('participantes');
 res.json(buscado);
 }
 
reunionCtrl.createReunion= async(req,res)=>{
    
    var reunion=new Reunion(req.body);
    try{
        const reuniont= await reunion.save();
        res.json({
            '_id' : reuniont._id,
            'status' : '1',
            'msg' : 'Reunion Guardada Correctamente',
        })
    }catch(error){
      res.status(400).json({
        'error' : error,
        'status' : '0',
        'msg': 'Error procesando operacion al guardar una renuion'
      })  

    }
}
reunionCtrl.getReunion = async(req,res)=>{
    const reunion= await Reunion.findById(req.params.id).populate('recursos').populate('oficina').populate('participantes');
    res.json(reunion);
}

/* reunionCtrl.getReunionesFiltro = async(req,res)=>{
    var reuniones = await Reunion.find({fecha:req.params.p1,participantes:req.params.p2,oficina:req.params.p3});
    res.json(reuniones);
} */

reunionCtrl.editReunion = async (req, res) => {
    const reunion = new Reunion(req.body);
    try {
    await Reunion.updateOne({_id: req.body._id}, reunion);
    res.json({
    'status': '1',
    'msg': 'reunion actualizado'
    }) 
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando la operacion'
    }) 
    }
    }

reunionCtrl.deleteReunion= async(req,res)=>{
    try {
        await Reunion.deleteOne({_id: req.params.id});
        res.json({
        status: '1',
        msg: 'Reunion removed'
        }) 
    } catch (error) {
        res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operacion'
        }) 
    }
}

reunionCtrl.addRecurso = async (req,res)=>{
    const idRecurso= req.params.idrecurso;
    const idReunion = req.params.id;
    var reunion= await Reunion.findById(idReunion);
    var recurso=await Recurso.findById(idRecurso);
    console.log(req.params.idrecurso);
    try{
        reunion.recursos.push(recurso);
        reunion.save();
        res.status(200).json({
            status : 1,
            msg: "Recurso Agregado"
        })
    }catch{
        res.status(400).json({
            status: 0,
            msg: "Error al procesar operacion"
        })
    }
}
reunionCtrl.deleteRecurso= async(req,res)=>{
    const idReunion= req.params.id;
    const reunion= await Reunion.findById(idReunion);
    const idRecurso = req.params.idrecurso;

    try{
        reunion.recursos.pull(idRecurso);
        await Reunion.updateOne({_id:idReunion},reunion);
        res.status(200).json({
            status:1,
            msg:"Recurso Eliminado"
        })
    }
    catch{
        res.status(400).json({
            status:0,
            msg:"Error al procesar operacion"
        })
    }
}
reunionCtrl.addParticipante = async (req,res)=>{
    const idParticipante= req.params.idparticipante;
    const idReunion = req.params.id;
    var reunion= await Reunion.findById(idReunion);
    var participante=await Participante.findById(idParticipante);
    console.log(req.params.idrecurso);
    try{
        reunion.participantes.push(participante);
        reunion.save();
        res.status(200).json({
            status : 1,
            msg: "Participante Agregado"
        })
    }catch{
        res.status(400).json({
            status: 0,
            msg: "Error al procesar operacion"
        })
    }
}
reunionCtrl.deleteParticipante= async(req,res)=>{
    const idReunion= req.params.id;
    const reunion= await Reunion.findById(idReunion);
    const idParticipante = req.params.idparticipante;

    try{
        reunion.participantes.pull(idParticipante);
        await Reunion.updateOne({_id:idReunion},reunion);
        res.status(200).json({
            status:1,
            msg:"Participante Eliminado"
        })
    }
    catch{
        res.status(400).json({
            status:0,
            msg:"Error al procesar operacion"
        })
    }
}


module.exports= reunionCtrl;