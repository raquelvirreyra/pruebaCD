const mongoose = require('mongoose');
const {Schema} = mongoose;
const Reunion= require('./reunion');
const Empleado= require('./empleado');
const NotificacionSchema= new Schema({
    leido:{type: Boolean, required:true},
    empleado:{type: Schema.Types.ObjectId,ref: Empleado, required:true},
    reunion:{type: Schema.Types.ObjectId,ref: Reunion, required:true}
})

module.exports = mongoose.models.Notificacion || mongoose.model('notificacion', NotificacionSchema)