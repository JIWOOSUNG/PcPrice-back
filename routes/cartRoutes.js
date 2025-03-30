const express = require('express');
const CartController = require('../controllers/cartController');

const router = express.Router();

router.post('/', CartController.addToCart);
router.get('/:cart_id', CartController.getCartById);

//특정 유저의 장바구니
router.get('/user/:user_id', CartController.getCartByUserId);
router.put('/:cart_id', CartController.updateCart);
router.delete('/:cart_id', CartController.removeFromCart);

module.exports = router;