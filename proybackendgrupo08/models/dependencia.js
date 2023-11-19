const mongoose = require('mongoose');
const {Schema} = mongoose;
const DependenciaSchema = new Schema({
    nombre: {type: String, required: true}
})
module.exports = mongoose.models.Dependencia || mongoose.model('Dependencia', DependenciaSchema);