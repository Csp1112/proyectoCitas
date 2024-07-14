const mongoose = require('mongoose');
const UsuariosSchema = mongoose.Schema({//contiene el esquema de la base de datos
//se definen los parámetros 
    nombre:{
        type:String,
        required:true,
        trim:true //elimina espacios al inicio y final de un string antes de guardarlo en la base de datos.
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    registro:{
        type:Date,
        default:Date.now() // establece el valor predeterminado del campo como la fecha y hora actual al crear un documento.
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);//exporta el modelo de usuario