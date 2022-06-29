const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')


const url = 'mongodb://localhost/Stockmanagmentapp'

const app = express()
app.use(cors())
mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false })
const connect = mongoose.connection
connect.on('open', () => {
    console.log("Connected")
})
app.use(express.json())
const stockRouter = require('./server/routes/routes')
app.use('/routes', stockRouter)
app.listen(3001, () => {
    console.log("Port started")
})