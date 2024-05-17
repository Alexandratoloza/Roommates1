
import { modelRoommates } from '../models/roommates.model.js';

export const getAllRoommates = async (req, res) => {
    try {
        const roommates = await modelRoommates.getAllRoommates();
        return res.json({ roommates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: error.message });
    }
}

export const create = async (req, res) => {
    try {
        const newRoommateData = req.body;
        const roommate = await modelRoommates.create(newRoommateData);
        return res.json({ roommate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: error.message });
    }
}
