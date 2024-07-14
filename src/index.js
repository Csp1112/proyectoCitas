const express = require('express')
const conectarBD = require('../config/db')
const cors = require('cors')


const app = express();
const port = process.env.PORT || 5000;

//enlazamos conexion con la base de datos

//llamamos la funcion conectarBD
conectarBD();
//habilitamos cors
app.use(cors());
//habilitamos express.json
app.use(express.json());


//rutas de la app
app.use('/api/citas',require('../routes/citasRuta'))
app.use('/api/clientes',require('../routes/cliente'))
app.use('/api/usuarios',require('../routes/usuarios'))
app.use('/api/auth',require('../routes/auth'))



//rutas de prueba y configuración 
app.get('/',(req,res)=>{
   res.send('Bienvenidos estamos desde el navegador');
});

app.listen(port, ()=>console.log('Estamos conectados con el servidor por el puerto: ', port))

