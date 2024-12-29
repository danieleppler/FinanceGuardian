const express =require('express')
const router = express.Router()

const auth_service = require('../services/auth_service')
const utils = require('../utils')

router.post('/register',async (req,res)=>{
    try{
        const result = await auth_service.register_user(req.body)
        if(result === 409)
            return res.status(409).send()
        return res.status(201).send()
    }
    catch(e){
        console.log(`${e.message } at ./register endpoint`)
        return res.status(500).send()
    }
    
})


router.post('/login',async (req,res) =>{
try{
    const result = await auth_service.validate_login(req.body)
    if(result.status === 401 && result.type === 'password')
        return res.status(401).send({err_type:'password',err:result.msg})

    if(result.status === 401 && result.type === 'username')
        return res.status(401).send({err_type:'username',err:result.msg})

    if(result.status === 200){
        const entry_token = await utils.assign_entry_token(req.body)
        return res.status(200).send({entry_token,id: result.id})
    }       
}
catch(e){
    console.log(`${e.message } at ./login endpoint`)
    return res.status(500).send()
}
})

router.post('/check_token',async (req,res) =>{
    if(await auth_service.check_token(req.body.entry_token))
        return res.status(200).send()
    else return res.status(401).send()
})

module.exports = router