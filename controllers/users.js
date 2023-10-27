const {request, response} = require ('express');
const bcrypt = require('bcrypt');
const usersModel = require('../models/users');
const pool = require('../db');

const usersList= async(req=request,res=response)=>{
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
        /*if (isNaN(id));
        res.status(404).json({msg:'Invalid ID'});
        return;*/

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
                return;
            }
    
            res.json(user);
            return;
        } catch (error){
            console.log(error);
            res.status(500).json({msg:'Error Connecting to MySQL database'});
            return;
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
            const saltRounds = 10; 
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const user = [username, email, passwordHash, name, lastname, phone_number, role_id, is_active];

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
        res.status(409).json({msg: 'user with name ${username} already exist'})
    }


const emailUser  = await conn.query(
    usersModel.getBYEmail,
    [email],
    (err) =>{
            if (err) throw err;}
    );
    if (email){
        res.status(409).json({msg: 'user with name ${email} already exist'})
    }


    const userAdded = await conn.query(usersModel.addRow, [...user], (err)=>{
        if (err) throw err;
    })
    if (userAdded.affectedRow === 0) throw new Error( {msg:'Failed add user'});

    res.json({msg: 'user added succesfully'});


}catch (error){
    console.log(error)
    res.status(500).json(error);
}finally{
    if (conn) conn.end();
}
}

/*
const updateUser = async (req = request, res = response) => {
    let conn;

    try{
    
        conn = pool.getConnection();
            const {id} = req.params;
    
            const [userExists] = (await conn).query(
                userModel.getByID,
                [id],
                (err) => {if (err) throw err;}
            );
            if (!userExists || userExists.id <= 1){
                res.status(404).json({msg: 'Username not found'});
                return;
            }
            
            const userUpdated = (await conn).query(
                userModel.updateRow,
                [id],
                (err) => {if (err) throw err;}
            );
            if(userUpdated.affectedRow === 0){
                throw new Error({msg: 'Failed to update user'})
            };
            res.json({msg:'User updated succesfully'});
    
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
    }
    */

    const updateUser = async (req = request, res = response) => {
        const{
            username,
            email,
            password,
            name,
            lastname,
            phone_number,
            role_id,
            is_active
        } = req.body;
    
    const {id}= req.params;

    let passwordHash;
    if(password){
        const saltRounds=10;
        passwordHash = await bcrypt.hash(password, saltRounds);
    }

    let newUserData = [
        username,
        email,
        passwordHash,
        name,
        lastname,
        phone_number,
        role_id,
        is_active];
    
        let conn;
    
    try{
        conn = pool.getConnection();
            const {id} = req.params;
    
            const [userExists] = (await conn).query(
                userModel.getByID,
                [id],
                (err) => {if (err) throw err;}
            );
            if (!userExists || userExists.is_active === 0){
                res.status(404).json({msg: 'User not found'});
                return;
            }
            if (username){
            const [usernameuser]  = await conn.query(
                usersModel.getBYUserame,
                [username],
                (err) =>{
                    if (err) throw err;}
            );
                if (usernameuser){
                    res.status(409).json({msg: `user with name ${username} already exist`})
                    return;
                }
            }
            if (email){
                res.status(409).json({msg: `user with name ${email} already exist`});
                return;
            }
        
        const oldUserData = [
            userExists.username,
            userExists.email,
            userExists.password,
            userExists.name,
            userExists.lastname,
            userExists.phone_number,
            userExists.role_id,
            userExists.is_active
        ];
        newUserData.forEach((userData) => { //llena el arreglo con la base de datos del que no mandamos a llamar
            if(!userData){
                newUserData[index] = oldUserData[index];
            }
        });
    
        const [userUpdated] = await conn.query(
            userModel.updateRow,
            [...newUserData, id],
            (err) => {if(err) throw err;}
        )
        if (userUpdated.affectedRow === 0){
            throw new Error('User not updated');
        }
        res.json({msg:'User updated successfully'})
    
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
    }
    

    const deleteUser = async (req = request, res = response) => {
        let conn;
        try{
            conn = pool.getConnection();
            const {id} = req.params;
    
            const [userExists] = (await conn).query(
                userModel.getByID,
                [id],
                (err) => {if (err) throw err;}
            );
            if (!userExists || userExists.is_active === 0){
                res.status(404).json({msg: 'User not found'});
                return;
            }
            const userDeleted = (await conn).query(
                userModel.deleteRow,
                [id],
                (err) => {if (err) throw err;}
            );
            if(userDeleted.affectedRow === 0){
                throw new Error({msg: 'Failed to delete user'})
            };
            res.json({msg:'User deleted succesfully'});
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
    }
    



    const iaiubd = async (res=response, req=request) => {
        let conn;
    };
    try{
        conn = {

        }
        const passwordOk = bcrypt.compare(password, user.password);
        if (!passwordOk){
            res.status(404).json({msg:'Wrong username or password'});
            return;
        }
        delete user.password;
        delete user.created_at;
        delete user.updated_at;

        res.json(user);

    } catch(error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
    


        module.exports = {usersList, listUserByID, updateRow, addUser, updateUser};
