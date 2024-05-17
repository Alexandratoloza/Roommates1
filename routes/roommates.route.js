import { Router } from 'express';

import { getAllRoommates, create} from '../controllers/roommates.controller.js'

const router = Router()

router.get('/',  getAllRoommates)

router.post('/', create)

export default router;

