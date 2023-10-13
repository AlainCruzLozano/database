const {request, response} = require ('express');
const usersModel = require('../models/users');
const pool = require('../db');

const usersList= async(req = request,res=response)=>{
    let conn;
    try {
        conn = await pool.getConnection();
        
        const users = await conn.query(usersModel.getAll,(err)=>{
            if(err){
                throw new Error(err);    //si se encuentra la variable error llena se manda al catch
            }
        })

        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }finally{
        if(conn) conn.end();
    }
}

    const listUserByID = async (req=request, res= response)=>{
        const {id} = req.params;
        
        if (isNaN(id));
        res.status(404).json({msg:'Invalid ID'});
        return



        let conn;
        try{ //evitar errores y lo envia al catch
            conn = await pool.getConnection();
    
            const user = await conn.query(usersModel.getByID, [id], (err)=>{
                if (err){
                    throw new Error(err);
                }
            })
            if (!user){
                res.status(404).json({msg:'User Not Found'});
                
            }
    
            res.json(user);
            
        } catch (error){
            console.log(error);
            res.status(500).json({msg:"Error Connecting to MySQL database"});
        
        }finally{
            conn.end();
            if (conn) conn.end();
        }
    }

    const addUser = async (req =request, res = response) => {
        
        const{
            username,
            email,
            password,
            name,
            lastname,
            phone_number='',
            role_id,
            is_active=1
        } = req.body;
        if(!username || !email || !password || !name || !lastname || !role_id){
                res.status(400).json({msg:'Missing information'});
                return;
            }

            const user = [user,name, email, password, name, lastname, phone_number, role_id, is_active];

            let conn;

try{
    conn = await pool.getConnection();

const usernameuser  = await conn.query(
    usersModel.getBYUserame,
    [username],
    (err) =>{
        if (err) throw err;}
);
    if (usernameuser){
        res.status(409).json({msg: `user with name ${username} already exist`})
    }


const emailUser  = await conn.query(
    usersModel.getBYEmail,
    [email],
    (err) =>{
            if (err) throw err;}
    );
    if (email){
        res.status(409).json({msg: `user with name ${email} already exist`})
    }


    const userAdded = await conn.query(usersModel.addRow, [...user], (err)=>{
        if (err) throw err;
    })
    if (userAdded.affectedRow === 0) throw new Error( {msg:"Failed add user"});

    res.json({msg: "user added succesfully"});


}catch (error){
    console.log(error)
    res.status(500).json(error);
}finally{
    if (conn) conn.end();
}
}

        module.exports = {usersList, listUserByID, addUser};
