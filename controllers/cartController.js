const CartService = require('../services/cartService');

class CartController {
    // 장바구니 추가
    static async addToCart(req, res) {
        try {
            const { user_id, part_id, quantity } = req.body;
            const cart = await CartService.addToCart(user_id, part_id, quantity);
            res.status(201).json({ message: '장바구니에 추가되었습니다.', cart });
        } catch (error) {
            console.error("서버에서 오류 발생:", error);  // 서버 오류 로그
            res.status(500).json({ message: '장바구니 추가 실패', error: error.message });
        }
    }

    // 특정 장바구니 조회
    static async getCartById(req, res) {
        try {
            const { cart_id } = req.params;
            const cart = await CartService.getCartById(cart_id);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ message: '장바구니 조회 실패', error: error.message });
        }
    }

    // 유저의 장바구니 조회
    static async getCartByUserId(req, res) {
        try {
            const { user_id } = req.params;
            const cart = await CartService.getCartByUserId(user_id);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ message: '장바구니 조회 실패', error: error.message });
        }
    }

    // 장바구니 수량 수정
    static async updateCart(req, res) {
        try {
            const { cart_id } = req.params;
            const { user_id, quantity } = req.body;
            const success = await CartService.updateCart(cart_id, user_id, quantity);
            if (success) {
                res.json({ message: '장바구니 수량이 업데이트되었습니다.' });
            } else {
                res.status(400).json({ message: '업데이트 실패' });
            }
        } catch (error) {
            res.status(500).json({ message: '장바구니 업데이트 실패', error: error.message });
        }
    }

    // 장바구니 삭제
    static async removeFromCart(req, res) {
        try {
            const { cart_id } = req.params;
            const { user_id } = req.body;
            const success = await CartService.removeFromCart(cart_id, user_id);
            if (success) {
                res.json({ message: '장바구니에서 삭제되었습니다.' });
            } else {
                res.status(400).json({ message: '삭제 실패' });
            }
        } catch (error) {
            res.status(500).json({ message: '장바구니 삭제 실패', error: error.message });
        }
    }
}

module.exports = CartController;