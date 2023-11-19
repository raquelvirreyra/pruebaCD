const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecursoSchema = new Schema({
tipoRecurso:{type: String, required:true},
recurso:{type:String,required:true},
disponible:{type:Boolean}
})

module.exports = mongoose.models.Recurso || mongoose.model('recurso', RecursoSchema)