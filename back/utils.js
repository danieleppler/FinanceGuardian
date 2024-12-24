const uuid = require('uuid')
const bcrypt = require('bcrypt')

const salt_round = Number(process.env.BCRYPT_SALT_ROUNDS)

const CreateUID = () =>{
    return uuid.v7()
}

const hash_password =  async (password) =>{
    const hashed_password =  await new Promise((res,rej) =>{
        bcrypt.hash(password,salt_round,(err,hash) =>{
            if(err)
                rej(err)
            res(hash)
        })    
    }) 
    return hashed_password
}

module.exports = {CreateUID,hash_password}