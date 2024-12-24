const db_client  = require('../db_client')
const utils = require('../utils')
const {INSERT_USER_QUERY,SELECT_USER_BY_USERNAME} = require('../Queries')


const create_user = async (user) =>{
    const uid = utils.CreateUID()
    const {first_name,last_name,age,user_name,password} = user
    await db_client.query(INSERT_USER_QUERY,[uid,first_name,last_name,age,user_name,password])
    return
}

const get_user_by_username = async (user_name) =>{
    const user = await db_client.query(SELECT_USER_BY_USERNAME,[user_name])
    return user
}

const get_all_users = () =>{
    

}

module.exports = {create_user,get_all_users,get_user_by_username}