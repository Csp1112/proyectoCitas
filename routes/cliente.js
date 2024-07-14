const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


//Creamos las rutas del crud 
//Como se va a agregar se usa POST 
router.post('/',clienteController.agregarCliente); //POST porque se agregar contenido
router.get('/',clienteController.mostrarClientes); //GET porque se muestra el contenido
router.get('/:id',clienteController.buscarCliente); //GET porque se muestra el contenido - id porque se busca por id findbyid
router.delete('/:id', clienteController.eliminarCliente);
// router.put('/:id', clienteController.actualizarCliente); //PUT para actualizar
router.put('/:id', clienteController.actualizarClientes); //segunda opcion de actualizar
router.patch('/:id', clienteController.modificarCliente);

//Se exporta el modulo, porque se debe llamar en el index principal
module.exports = router; //se exporta el router, para que se pueda utilizar en el index principal



