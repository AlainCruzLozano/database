const {Router} = requiere('express');
const {usersList} = requiere('../controllers/users');

const router = Router();

// http://localhost:3000/api/vi/users/
router.get('/', usersList);

module.exports = router;

