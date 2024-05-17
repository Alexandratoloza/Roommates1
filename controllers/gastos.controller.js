import { nanoid } from "nanoid";
import { readFile, writeFile } from "fs/promises";
import path from "path"


const __dirname = import.meta.dirname
const pathFile = path.join(__dirname, "/db/roommates.json")
const filePath = __dirname + "/db/roommates.json";


const getGastos = async (req, res) => {
    try {
        const stringGastos = await readFile(pathFile, 'utf8')
        const Gastos= JSON.stringify(stringGastos)
        return res.JSON("Gastos", { Gastos })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}



export const GastosController = {
    getGastos,
    //createTodo,
   // deleteTodo,
   // updateTodo,
   // formEditTodo 
}