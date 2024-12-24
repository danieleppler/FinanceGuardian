

const mock_users = [{user_name : 'AVI1',password:'123'}]

const user_repo = require('../reposetories/user_repo')

const register_user = async (new_user) =>{

    user_repo.create_user(new_user)
    return 
}

const validate_login = async (user_from_client) =>{
    const temp_user = user_repo.get_user_by_username(user_from_client.f_username)

    if(!temp_user)
        return {type:'username',msg:'username not found',status:401}
    
    if(temp_user.password !== user_from_client.f_password)
        return {type:'password',msg:'incorrect password',status:401}
        
     return {status:200}
}

module.exports = {register_user,validate_login}