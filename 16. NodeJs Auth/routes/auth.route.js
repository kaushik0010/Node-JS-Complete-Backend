const express = require('express');
const router = express.Router();
const { registerUser, loginUser, changePassword } = require('../controllers/auth-controller');

const authMiddleware = require('../middleware/auth.middleware')


// routes related to authentication and authorization
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);



module.exports = router;