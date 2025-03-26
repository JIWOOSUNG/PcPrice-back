const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/delete/:id', authController.deleteUser);
router.post('/logout', authController.logout);
router.update('/update/:id', authController.updateUser)
module.exports = router;
