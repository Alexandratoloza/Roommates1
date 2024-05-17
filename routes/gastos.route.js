import { Router } from "express"
import { GastosController } from "../controllers/gastos.controller.js"

const router = Router()


router.get('/', GastosController.getGastos )


export default router;