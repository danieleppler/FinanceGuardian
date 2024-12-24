const express = require('express')

require('dotenv').config({path: __dirname + '/.env'})
require('./db_client')

const app = express()
const port = process.env.SERVER_PORT
app.use(express.json())

const user_controller = require('./controllers/user_controller')
app.use('/users',user_controller) 

try{
    app.listen(port,() =>{
        console.log(`app listening on port ${port}`)
    })
}
catch(e){
    console.log(`${e.message }  `)
}
