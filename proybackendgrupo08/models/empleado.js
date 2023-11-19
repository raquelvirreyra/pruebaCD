const mongoose = require('mongoose');
const {Schema} = mongoose;
const Dependencia = require('./dependencia');
const EmpleadoSchema = new Schema({
    Apellido: {type: String, required: true},
    Legajo: {type: Number, required: true},
    Nombre: {type:String, required: true},
    Email: {type:String, required:true},
    Dependencias:[{type: Schema.Types.ObjectId,ref: Dependencia }]
})
module.exports = mongoose.models.Empleado || mongoose.model('Empleado', EmpleadoSchema);