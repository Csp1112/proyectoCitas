const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

//creamos nuevas rutas para el CRUD
router.post('/',citaController.agregarCitas);
router.get('/',citaController.mostrarCitas);
router.put('/:id',citaController.actualizarCitas);
router.get('/:id',citaController.buscarCita);
router.delete('/:id',citaController.eliminarCita);
router.patch('/:id', citaController.modificarCita);

module.exports = router;
