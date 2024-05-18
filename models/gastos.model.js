import express from 'express';
import { promises as fs } from 'fs'; 
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const gastosFilePath = path.join(__dirname, '../db/gastos.json');
const roommatesFilePath = path.join(__dirname, '../db/roommates.json');


const readJSONFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw error;
    }
};


const writeJSONFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data), 'utf-8');
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error);
        throw error;
    }
};


const allGastos = async () => {
    return await readJSONFile(gastosFilePath);
};


const gastosById = async (id) => {
    const datosJson = await readJSONFile(gastosFilePath);
    return datosJson.find(e => parseInt(e.id) === id);
};


const create = async ({ roommate_id, descripcion, monto }) => {
    try {
        const gastosData = await readJSONFile(gastosFilePath);
        const roommateData = await readJSONFile(roommatesFilePath);

        roommateData.forEach(e => {
            if (e.id === roommate_id) {
                e.debit = (parseInt(e.debit) + parseInt(monto)).toString();
            }
        });

        const newGasto = { id: gastosData.length, roommate_id, descripcion, monto };
        gastosData.push(newGasto);

        await writeJSONFile(gastosFilePath, gastosData);
        await writeJSONFile(roommatesFilePath, roommateData);

        return newGasto;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const updateGastos = async ({ id, roommate_id, descripcion, monto }) => {
    try {
        const gastosData = await readJSONFile(gastosFilePath);
        const roommateData = await readJSONFile(roommatesFilePath);

        let oldMonto = 0;
        let oldRoommate = "";
        let roommateChanged = false;

        gastosData.forEach(e => {
            if (parseInt(e.id) === parseInt(id)) {
                if (e.roommate_id !== roommate_id) {
                    oldRoommate = e.roommate_id;
                    roommateChanged = true;
                }

                oldMonto = e.monto;
                Object.assign(e, { roommate_id, descripcion, monto });
            }
        });

        if (roommateChanged) {
            roommateData.forEach(e => {
                if (e.id === oldRoommate) {
                    e.debit = (parseInt(e.debit) - parseInt(oldMonto)).toString();
                }
                if (e.id === roommate_id) {
                    e.debit = (parseInt(e.debit) + parseInt(monto)).toString();
                }
            });
        }

        await writeJSONFile(gastosFilePath, gastosData);
        await writeJSONFile(roommatesFilePath, roommateData);

        return gastosData.find(e => parseInt(e.id) === parseInt(id));
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const remove = async (id) => {
    try {
        const gastosData = await readJSONFile(gastosFilePath);
        const roommateData = await readJSONFile(roommatesFilePath);

        const index = gastosData.findIndex(e => parseInt(e.id) === parseInt(id));
        if (index === -1) {
            throw new Error('No se encontró el gasto!');
        }

        const deletedGasto = gastosData.splice(index, 1)[0];

        roommateData.forEach(e => {
            if (e.id === deletedGasto.roommate_id) {
                e.debit = (parseInt(e.debit) - parseInt(deletedGasto.monto)).toString();
            }
        });

        await writeJSONFile(gastosFilePath, gastosData);
        await writeJSONFile(roommatesFilePath, roommateData);

        return deletedGasto;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const gastosModel = {
    allGastos,
    gastosById,
    create,
    updateGastos,
    remove,
};
