const mongoose = require('mongoose');
const URI = 'mongodb://mongo1:27017/proyectofinalbd?authSource=admin';
mongoose.connect(URI)
.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err))
module.exports = mongoose;