const { Router } = require('express');
const { userController } = require('../../controllers');

const router = Router();

router.post('/users/register', userController.registerUser);
router.get('/users', userController.getUsers);

module.exports = router;