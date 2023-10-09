const {request, response} = require ('express');
const connection = require('../db');

const usersList = (req=request, res= response)=>{
    try{ //evitar errores y lo envia al catch
        connection.connect((err)=>{
            if (err){
                throw new Error(err);
            }else{
                connection.execute('SELECT * FROM Users', (err, users)=>{
                    if (err){
                        throw new Error(err);
                    }
                    res.json(users);
                })
            }
        })
    } catch (error){
        res.status(500).json({msg:"Error Connecting to MySQL database"});
    }finally{
        connection.end();
    }
}
    module.exports = {usersList};