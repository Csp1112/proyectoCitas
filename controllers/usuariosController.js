const Usuario = require('../models/Usuario');
//usamos las dependencias que descargamos 
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

//creamos la funcion para crear un usuario
exports.crearUsuario = async (req, res) => {
    //revisamos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    //extraemos email y password
    const {email, password} = req.body;
    try {
        //revisamos que el usuario registrado sea único
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }
        //creamos el nuevo usuario
        usuario = new Usuario(req.body);
        //hash la contraseña
        usuario.password = await bcryptjs.hash(password,10); //crear un password con un limite de 10 caracteres
        //guardamos el nuevo usuario en la base de datos 
        await usuario.save();
        //creamos el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //firmamos el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1 hora
            }, (error, token) => {
                if(error) throw error;
                //mensaje de confirmación
                res.json({token});
            }
        );

    } catch(error){
        console.log('Hubo un error');
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};