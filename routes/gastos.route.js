import { Router } from "express"
import { getAllGastos, GastoById, createGasto, updateGasto, deleteGasto } from "../controllers/gastos.controller.js"

const router = Router()




router.get('/', getAllGastos);
router.get('/:id', GastoById);
router.post('/', createGasto);
router.put('/', updateGasto);
router.delete('/', deleteGasto);


export default router;