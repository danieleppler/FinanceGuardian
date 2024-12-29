const db_client = require('../db_client')
const utils = require('../utils')
const {INSERT_EXPENSE_QUERY} = require('../Queries')

const create = async (expense) =>{
    const {type,title,date,amount,fixed,user_id} = expense
    const id = utils.CreateUID()
    await db_client.query(INSERT_EXPENSE_QUERY,[id,type,title,date,amount,fixed,user_id])
    return
} 

module.exports  = {create}