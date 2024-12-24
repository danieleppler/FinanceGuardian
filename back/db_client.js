const pgp = require('pg-promise')()
const con_string = process.env.SQL_CONNECTION_STRING


db = pgp(con_string)


module.exports = db 

