//para acceder al modulo 
const mongoose = require('mongoose');

//el modelo que vamos a implementar debe ser el mismo a la base de datos 
const clienteSchema = mongoose.Schema({ //esquema de cómo va a estar el documento de nuestro cliente -> metodo Schema
    //se construye un JSON, el modelo
    nombres:{
        type: String, //tipo de dato
        required: true //si el campo es obligatorio (true) o no (false)
    },

    apellidos:{
        type: String, 
        required: true 
    },

    cedula:{
        type: Number, 
        required: true
    }, 

    correo:{
        type: String,
        required: true
    },

    numeroContacto:{
        type: Number,
        required: true
    },

    nit:{
        type: Number,
        required: true
    },

    direccion:{
        type: String,
        required: true
    }

},{versionkey:false}); //cuando se hace consulta en Mongo, a veces aparece versión, por eso se debe quitar con 'false'


//Exportar el documento 
module.exports = mongoose.model('Cliente',clienteSchema); //se exporta el modelo, el nombre del modelo y el esquema que se va a utilizar