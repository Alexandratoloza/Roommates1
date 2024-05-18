import { gastosModel } from '../models/gastos.model.js'


export const getAllGastos = async(req, res) =>{
    try {
        const gastos = await gastosModel.allGastos();
        return res.json({gastos});
    } catch (error) {
        console.error(error)
        res.json( { ok: false,  error });
    }
}

export const GastoById = async(req, res)=>{
    try {
        const { id } = req.params
        const gasto = await gastosModel.gastosById(id);
        return res.json({gasto});
    } catch (error) {
        console.error(error);
        res.json({ ok: false, error});
    }
}

export const createGasto = async(req, res)=>{
    try {
        const { roommate_id, descripcion, monto} = req.body
        const gasto = await gastosModel.create({roommate_id, descripcion, monto});
        return res.json({gasto});
    } catch (error) {
        console.error(error);
        res.json({ok: false, error})
    }
}

export const updateGasto = async(req, res)=>{
    try {
        const { id } = req.query
        const { roommate_id, descripcion, monto} = req.body
        const gasto = await gastosModel.updateGastos(id, {roommate_id, descripcion, monto});
        return res.json({gasto});
    } catch (error) {
        console.error(error);
        res.json({ok: false, error})
    }
}

export const deleteGasto = async(req, res)=>{
    try {
        const { id } = req.query
        const gasto = await gastosModel.remove(id);
        return res.json({gasto});
    } catch (error) {
        console.error(error);
        res.json({ok: false, error})
    }
}