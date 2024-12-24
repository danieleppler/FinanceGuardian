const express =require('express')
const router = express.Router()

const user_service = require('../services/user_service')

router.post('/register',async (req,res)=>{
    try{
        const result = await user_service.register_user(req.body)
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
    const result = await user_service.validate_login(req.body)
    if(result.status === 401 && result.type === 'password')
        return res.status(401).send({err_type:'password',err:result.msg})

    if(result.status === 401 && result.type === 'username')
        return res.status(401).send({err_type:'username',err:result.msg})

    if(result.status === 200)
        return res.status(200).send()
}
catch(e){
    console.log(`${e.message } at ./login endpoint`)
    return res.status(500).send()
}
})

module.exports = router