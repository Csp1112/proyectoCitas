const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');
const {check} = require('express-validator');

//Crear un usuario
// api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agregar un email válido').isEmail(),
        check('password', 'El password debe ser mínimo de 10 caracteres').isLength({min: 10})
    ],
    usuarioController.crearUsuario
);
//exportamos el módulo
module.exports = router;

