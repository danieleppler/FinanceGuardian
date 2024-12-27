const db_client  = require('../db_client')
const utils = require('../utils')
const {INSERT_USER_QUERY,SELECT_USER_BY_USERNAME_QUERY,SELECT_ALL_USERS_QUERY} = require('../Queries')


const create_user = async (user) =>{
    const {first_name,last_name,age,username,password} = user

    const uid = utils.CreateUID()
    const hashed_password = await utils.hash_password(password)

    await db_client.query(INSERT_USER_QUERY,[uid,first_name,last_name,age,username,hashed_password])
    return
}

const get_user_by_username = async (user_name) =>{
    const user = await db_client.query(SELECT_USER_BY_USERNAME_QUERY,[user_name])
    return user
}

const get_all_users = async () =>{
    const users = await db_client.query(SELECT_ALL_USERS_QUERY)
    return users

}

module.exports = {create_user,get_all_users,get_user_by_username}