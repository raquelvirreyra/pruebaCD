const mongoose = require('mongoose');
const {Schema} = mongoose;
const OficinaSchema = new Schema({
numero:{type: Number},
estado:{type: String,required:true},
capacidad:{type:Number}
})
module.exports = mongoose.models.Oficina || mongoose.model('oficina', OficinaSchema)