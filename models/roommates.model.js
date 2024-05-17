import { nanoid } from "nanoid";
import { promises as fs } from "fs";
import path from "path";
import axios from "axios";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Función para leer el archivo JSON
const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return data;
    } catch (error) {
        console.error("Error reading file:", error);
        throw error;
    }
};

// Función para escribir en el archivo JSON
const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, data, 'utf-8');
    } catch (error) {
        console.error("Error writing file:", error);
        throw error;
    }
};

// Función para obtener todos los roommates
const allroommates = async () => {
    try {
        const filePath = await readFile(path.join(__dirname, '../db/roommates.json'));
        const datos = JSON.parse(filePath);
        return datos;
    } catch (error) {
        console.error(error);
        throw { ok: false, error: error.message };
    }
};

// Función para crear un nuevo roommate
const create = async () => {
    try {
        const filePath = await readFile(path.join(__dirname, '../db/roommates.json'));
        const datos = JSON.parse(filePath);

        const response = await axios.get('https://randomuser.me/api');
        const dataJson = response.data;

        if (!dataJson) {
            throw new Error('No se pudo obtener datos!');
        }

        const newRoommate = {
            id: nanoid(),
            name: `${dataJson.results[0].name.first} ${dataJson.results[0].name.last}`,
            debit: 0,
            income: 9999
        };

        datos.push(newRoommate);
        await writeFile(path.join(__dirname, '../db/roommates.json'), JSON.stringify(datos));

        return newRoommate;
    } catch (error) {
        console.error(error);
        throw { error: error.message };
    }
};


export const modelRoommates = {
    allroommates,
    create
};
