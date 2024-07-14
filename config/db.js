//Configuración de la base de datos 
const mongoose = require('mongoose')
require('dotenv').config({path:".env"})

const conectarBD = async()=>{
    mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log('Estamos conectados con Mongo DB'))
    .catch((error)=>console.log('Error al conectar con Mongo DB',error))
}
module.exports = conectarBD; //conectarBD cuando se llame, se llama toda la conexión que tiene que ver con la base de datos 
