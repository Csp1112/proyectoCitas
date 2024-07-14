//Debe comunicarse (conectarse) con el modelo 
const Cliente = require('../models/Cliente');

//Función AGREGAR Clientes 
exports.agregarCliente = async (req,res) => {
    try {
        //Crear un nuevo cliente 
        let cliente = new Cliente(req.body);
        await cliente.save(); //espera mientras que cliente se guarda
        res.send(cliente); //envia por consola lo que esta en cliente que se acaba de crear
        // res.json({mensaje: 'Cliente agregado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al agregar un cliente');
    }
};


//Función para MOSTRAR todos los clientes 

exports.mostrarClientes = async (req,res) => {

/* Esta línea utiliza la palabra clave await para esperar a que la promesa devuelta por Cliente.find() se resuelva
Cliente.find() es probablemente un método que recupera una lista de clientes de una base de datos
const cliente = await Cliente.find();

Una vez que la promesa se resuelve, el resultado se almacena en la variable cliente
El resultado es probablemente un arreglo o una colección de objetos de cliente

Esta línea envía una respuesta JSON de vuelta al cliente (por ejemplo, un navegador web)
El cuerpo de la respuesta contiene los datos del cliente recuperados en la línea anterior
res.json(cliente);

*/
    try {
        const cliente = await Cliente.find();
        res.json(cliente);
    } catch (error) {

 /*       
Imprime el contenido de la variable 'error' en la consola
Esto es útil para registrar y diagnosticar el problema que ocurrió
console.log(error);

Envía una respuesta HTTP con un estado de error 500 al cliente
Incluye un mensaje que indica que hubo un problema al mostrar los clientes
Esto informa al cliente que se produjo un error en el servidor
res.status(500).send('Hubo un error al mostrar los clientes');
*/
        console.log(error);
        res.status(500).send('Hubo un error al mostrar los clientes');
        
    }
};



//Función para BUSCAR UN cliente 
exports.buscarCliente = async (req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            res.status(404).send('No se encuentra el cliente');
        } else{
            res.send(cliente);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al consultar el cliente');
        
    }

};

//funcion para ELIMINAR un cliente 
exports.eliminarCliente = async (req,res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            res.status(404).send('No se encuentra el cliente');
        } else{
            await Cliente.findByIdAndDelete(req.params.id);
            res.send('Cliente eliminado correctamente');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el cliente');
        
    }
};

// // primera opcion: funcion para ACTUALIZAR un cliente 
// exports.actualizarCliente = async(req,res)=>{
//     try{
//         const {nombres, apellidos, documento, correo, telefono, direccion} = req.body
//         let cliente = await Cliente.findById(req.params.id);

//         if (!cliente) {
//             res.status(400).json({msg:'El cliente no existe'});
//             return
//         }
//         //se necesita actualizar cada propiedad
//         cliente.nombres = nombres;
//         cliente.apellidos = apellidos;
//         cliente.documento = documento;
//         cliente.correo = correo;
//         cliente.telefono = telefono;
//         cliente.direccion = direccion;

//         //se llama al modelo y se actualizan los registros
//         cliente = await Cliente.findOneAndUpdate({_id:req.params.id}, cliente, {new:true}); 
//         res.json(cliente);

//     }catch(error){
//         console.log(error);
//         res.status(500).send('Hubo un error al actualizar el cliente');
//     }
// };

//segunda opcion: funcion ACTUALIZAR cliente 
exports.actualizarClientes = async(req,res) =>{
    try {
        const cliente = await Cliente.findOneAndUpdate({_id:req.params.id}, req.body);   
        if(!cliente){ 
            res.status(404).send('Cliente no encontrado');
        } else{
            res.json(cliente);}
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el cliente');
        
    }
};


//funcion para modificar un cliente
exports.modificarCliente = async(req,res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!cliente){
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el cliente');
        
    }
};