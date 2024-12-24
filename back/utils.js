const uuid = require('uuid')

const CreateUID = () =>{
    return uuid.v7()
}

module.exports = {CreateUID}