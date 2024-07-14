const Cita = require('../models/Cita');

//función agregar citas
exports.agregarCitas = async (req,res) => {
    try {
        // Crear una nueva cita
        let citas = new Cita(req.body);
        await citas.save();
        // Enviar una única respuesta con los datos de la cita y un mensaje
        res.json({ citas, mensaje: 'Cita agregada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al agregar una cita');
    }
}

//función mostrar citas
exports.mostrarCitas = async (req,res) => {
    try {
        const citas = await Cita.find();
        res.json({citas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al mostrar las citas');
    }
}

//función actualizar citas
exports.actualizarCitas = async (req,res) => {
    try {
        const citas = await Cita.findOneAndUpdate({
            _id: req.params.id
        }, req.body);

        if(!citas){
        return res.status(404).send('Cita no encontrada');
        }else{
            res.json({citas, mensaje: 'Cita actualizada correctamente'});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar la cita');
    }
}

//función para buscar una cita
exports.buscarCita = async (req, res) => {
    try {
        let citas = await Cita.findById(req.params.id);
        if (!citas) {
            res.status(404).send('No se encuentra la cita');
        } else{
            res.send(citas);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al consultar la cita');
        
    }

};

//función para eliminar una cita
exports.eliminarCita = async (req,res) => {
    try {
        let citas = await Cita.findById(req.params.id);
        if (!citas) {
            res.status(404).send('No se encuentra la cita');
        } else{
            await Cita.findByIdAndDelete(req.params.id);
            res.send('Cita eliminada correctamente');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar la cita');
        
    }
};

//función para modificar una cita 
exports.modificarCita = async(req,res) => {
    try {
        const citas = await Cita.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!citas){
            return res.status(404).send('Cita no encontrada');
        }
        res.send(citas);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar la cita');
        
    }
};