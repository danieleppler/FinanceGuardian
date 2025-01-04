const db_client = require('../db_client')
const utils = require('../utils')
const {UPDATE_EXPENSE_QUERY,INSERT_EXPENSE_QUERY,SELECT_EXPENSES_BY_USER_ID_QUERY,DELETE_EXPENSE_QUERY} = require('../Queries')


const create = async (expense) =>{
    const {type,title,date,amount,fixed,user_id} = expense
    const id = utils.CreateUID()
    await db_client.query(INSERT_EXPENSE_QUERY,[id,type,title,date,amount,fixed,user_id])
    return
} 

const read_by_user_id = async (id)=>{
    const data = await db_client.query(SELECT_EXPENSES_BY_USER_ID_QUERY,[id])
    return data
}

const delete_expense = async (id) =>{
    return await db_client.query(DELETE_EXPENSE_QUERY,id)    
}

const update_expense = async (expense) =>{
    const {id,type,title,date,amount,fixed,user_id} = expense
    return await db_client.query(UPDATE_EXPENSE_QUERY,[id,type,title,date,amount,fixed,user_id])
}

module.exports  = {create,read_by_user_id,delete_expense,update_expense,update_expense}