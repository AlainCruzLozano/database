//va en controles
const {request, response} = require ('express');

const usersList = (req=request, res= response)=>{
    res.json({msg: "Hola usuario,"});
}
    module.exports = {usersList};