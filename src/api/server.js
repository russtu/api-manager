const cors = require('cors')
const express = require('express')
require('dotenv').config()
const router = require('./routes/index')

const app = express()
app.use(cors())
app.use(express.json())


//Constantes
const { PORT, BASE_URL } = process.env

//Routes

app.use('/manager' , router)



app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL} : ${PORT}`)
})