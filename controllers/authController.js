const Usuario = require('../models/Usuario');
//usamos las dependencias que descargamos 
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

//creamos la funcion para autenticar un usuario
exports.autenticarUsuario = async (req, res) => {
    //revisamos errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    //extraemos email y password
    const {email, password} = req.body;

    try {
       //revisar si el usuario esta registrado
         let usuario = await Usuario.findOne({email});
            if(!usuario){
                return res.status(400).json({msg: 'El usuario no existe'});
            }
        //revisar el password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passwordCorrecto){
            return res.status(400).json({msg: 'Contraseña incorrecta'});
        }
        //si todo es correcto creamos el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //firmamos el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1 hora
            }, (error, token) => {
                if(error) {
                    console.error(error.message);
                    throw error;
                //mensaje de confirmación
                }res.json({token});
            });

    } catch(error){
        console.error('Error en autenticar usuario',error.message);
        console.log(error);
        res.status(500).send('Error del servidor');
    }

};

exports.usuarioAutenticado = async(req,res)=>{
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});
    } catch (error) {
        console.error('Error en usuario autenticado',error.message);
        res.status(500).send('Error del servidor');
    }
}