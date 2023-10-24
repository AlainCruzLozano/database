const {Router} = require('express');
const {usersList,listUserByID,addUser,updateUser,deleteUser}=require('../controllers/users');


const router = Router();

// http://localhost:3000/api/v1/users/?
router.get('/', usersList);
router.get('/:id', listUserByID);
router.put('/', addUser);
router.patch('/:id',updateUser);
router.delete('/',deleteUser);

//router.put('/',usersList);
//router.post('/',usersList);

module.exports = router;