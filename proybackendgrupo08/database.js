const mongoose = require('mongoose');
const URI = 'mongodb://root:root@mongodb-container:27017/proyectofinalbd?authSource=admin';
mongoose.connect(URI)
.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err))
module.exports = mongoose;