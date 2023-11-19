const mongoose = require('mongoose');
const {Schema} = mongoose;
const Oficina= require('./oficina');
const Recurso= require('./recurso');
const Empleado = require('./empleado');
const ReunionSchema = new Schema({
    titulo:{type: String},
    fecha:{type: String,required:true},
    horaInicio:{type: String,required:true},
    horaFin:{type: String,required:true},
    oficina :{type: Schema.Types.ObjectId,ref: Oficina, required:true},
    tipoReunion: {type: String,required:true},
    estadoReunion: {type:String,required:true},
    recursos :[{type: Schema.Types.ObjectId,
                ref: Recurso            
    }],
    participantes : [{type: Schema.Types.ObjectId, ref: Empleado}]  
})

module.exports = mongoose.models.Reunion || mongoose.model('reunion', ReunionSchema)