import express from 'express';
import { readFile } from 'fs';
import { } from 'fs/promises'
import path from 'path';


const __dirname = import.meta.dirname

const Allgastos = async () => {
    try{
        const filePath =  await readFile(path.join(__dirname, '../db/gastos.json'))
        const datosJson = JSON.parse(filePath)

        return datosJson;

    }catch (error){
        console.log(error);

    }

}
///manejo de errores pendiente

const gastosByD = async (id) => {
    try{

        const filePath = await readFile(path.join(__dirname, '..db/gastos.json'))
        const datosJson = JSON.parse(filePath)
        const gastos = datosJson.find(e => parseInt(e.id) === id);


        
        return gastos;
    }catch (error){
        console.log(error);

    }
}

const create = async ({ roommate_id, descripcion , monto} ) =>{
try{

    const gastos = await readFile(path.join(__dirname, '../db/gastos.json'))
    const gastosData = JSON.parse(gastos);

    const roommate = await readFile(path.join(__dirname, '../db/roommates.json'));
    const roommateData = JSON.parse(roommate);


    roommateData.forEach(e  => {
        if(e.id  === roommate_id){
            Object.assign(e, {debit: parseInt(e.debit)+parseInt(monto)})
        }
    });

    const gasto = { id: gastosData.length, roommate_id, descripcion, monto };
    console.log(gasto);
    gastosData.push(gasto);

    await writeFile(path.join(__dirname, '../db/gastos.json'), JSON.stringify(gastosData));
    await writeFile(path.join(__dirname, '../db/roommates.json'), JSON.stringify(roommateData));

    return gastosData();

} catch(error){

    console.log(error)
}}


      