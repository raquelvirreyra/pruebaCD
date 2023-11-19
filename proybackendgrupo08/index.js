const express = require('express');
const app = express();
const cors = require('cors');
const {mongoose} = require('./database');
const Dependencia = require('./models/dependencia');
const Oficina= require('./models/oficina');
const Empleado = require('./models/empleado');
const Usuario = require('./models/usuario');
const Recurso= require('./models/recurso');

const bodyparser = require('body-parser');

//para correo
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost' }));

//Cargamos el modulo de direccionamiento de rutas
app.use('/api/empleado', require('./routes/empleado.route.js'));
app.use('/api/usuario', require('./routes/usuario.route'));
app.use('/api/dependencia', require('./routes/dependencia.route'));
app.use('/api/reunion/',require('./routes/reunion.route'));
app.use('/api/oficina/',require('./routes/oficina.route'));
app.use('/api/recurso/',require('./routes/recurso.route'));
app.use('/api/correo', require('./routes/correo.route'));
app.use('/api/notificacion',require('./routes/notificacion.route'));

//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));

//cargando archivos necesarios

//cargar dependencias
var query = Dependencia.find();
query.exec( function (err,dependencias){
   if(!dependencias.length){
        const dependencia1= new Dependencia({
            nombre: 'Contable'
        });
        dependencia1.save();
        const dependencia2= new Dependencia({
            nombre: 'Personal'
           });
        dependencia2.save();

    }
});


var query2= Oficina.find();
query2.exec(function (err,oficinas){
    if(!oficinas.length){
        const oficina1= new Oficina({
            numero: 1,
            estado: 'disponible',
            capacidad: 25
        });
        oficina1.save();
        const oficina2= new Oficina({
            numero: 2,
            estado: 'disponible',
            capacidad: 40
        });
        oficina2.save();
        const oficina3= new Oficina({
            numero: 3,
            estado: 'disponible',
            capacidad: 100
        }); 
        oficina3.save();
    }
});

var query5=Recurso.find();
query5.exec(function(err,recursos){
    if(!recursos.length){
        const recurso1= new Recurso({
            tipoRecurso: 'Fisico',
            recurso: 'Proyector',
            disponible: true
        })
        recurso1.save();
        const recurso2= new Recurso({
            tipoRecurso: 'Logico',
            recurso: 'PDF',
            disponible: true
        })
        recurso2.save();
        const recurso3= new Recurso({
            tipoRecurso: 'Fisico',
            recurso: 'Equipo de Audio',
            disponible: true
        })
        recurso3.save();
        const recurso4= new Recurso({
            tipoRecurso: 'Logico',
            recurso: 'Video',
            disponible: true
        })
        recurso4.save();
    }
}) 


var query4= Usuario.find();
query4.exec(function (err,usuarios){
    if(!usuarios.length){
        const dependencia1= new Dependencia({
            nombre: 'Auditor'
        });
        dependencia1.save();
        const empleado= new Empleado({
            Apellido: 'admin',
            Legajo: '1999',
            Nombre: 'admin',
            Email:'gmail@gmail.com',
            Dependencias:dependencia1
          });
          empleado.save();
          const empleado1= new Empleado({
            Apellido: 'Espinoza',
            Legajo: '1234',
            Nombre: 'Alfredo',
            Email: 'alfredo_espi@hotmail.com',
            Dependencias: dependencia1
          });
          empleado1.save();
        const usuario= new Usuario({
            username: 'admin',
            password: 'admin',
            perfil: 'Administrador',
            empleado:empleado
            
          });
          usuario.save();
    }
})





});