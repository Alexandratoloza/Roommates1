import express from 'express'
import path from 'path';

import gastosRoutes from './routes/gastos.route.js'
import roommatesRoutes from './routes/roommates.route.js'

const app = express()

const __dirname = import.meta.dirname

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => {  })


app.use('/gastos', gastosRoutes)
app.use('/roommates', roommatesRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`servidor andando en el puerto ${PORT}...'`))