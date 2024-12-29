const express = require('express')
const cors = require('cors')

require('dotenv').config({path: __dirname + '/.env'})
require('./db_client')

const app = express()
const port = process.env.SERVER_PORT

app.use(express.json())
app.use(cors())

const auth_controller = require('./controllers/auth_controller')
app.use('/auth',auth_controller) 

const expense_controller = require('./controllers/expense_controller')
app.use('/expenses',expense_controller)

try{
    app.listen(port,() =>{
        console.log(`app listening on port ${port}`)
    })
}
catch(e){
    console.log(`${e.message }  `)
}
