const mongoose = require("mongoose");
const {Schema} = mongoose;
const Empleado = require('./empleado');
const UsuarioSchema = new Schema({
username: {type: String, required: true},
password: {type:String, required:true},
perfil: {type:String, required: true}, //administrador - visitante 
empleado: {type: Schema.Types.ObjectId, ref: Empleado}
});
//exporto objeto para que pueda ser usado en otros lugares
module.exports = mongoose.model('Usuario', UsuarioSchema);
//module.exports = mongoose.models.Sector || mongoose.model('Sector', SectorSchema);