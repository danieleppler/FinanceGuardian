
const utils = require('../utils')

const user_repo = require('../reposetories/user_repo')

const register_user = async (new_user) =>{
    const users = await user_repo.get_all_users()

    if (users.find((x) => x.user_name === new_user.username)) {
        return 409
    }

    user_repo.create_user(new_user)
    return 200
}

const validate_login = async (user_from_client) =>{
    const temp_user = await user_repo.get_user_by_username(user_from_client.f_username)

    if(temp_user.length === 0)
        return {type:'username',msg:'username not found',status:401}


    if(!await utils.check_password(user_from_client.f_password,temp_user[0].password ))
        return {type:'password',msg:'incorrect password',status:401}
        
     return {status:200,id:temp_user[0].id}
}

const check_token = async (token) =>{
    return await utils.check_token(token)
}

module.exports = {register_user,validate_login,check_token}