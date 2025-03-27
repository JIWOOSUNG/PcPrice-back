const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 회원root: http://localhost:5500/api/auth

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/delete/:id', authController.deleteUser);
router.post('/logout', authController.logout);
router.put('/update/:id', authController.updateUser)

module.exports = router;
