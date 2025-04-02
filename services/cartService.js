const Cart = require('../models/Cart');

class CartService {
    // 장바구니에 상품 추가
    static async addToCart(user_id, part_id, quantity) {
        // Cart 인스턴스 생성
        const cart = new Cart(null, user_id, part_id, quantity, null);  // added_at은 모델에서 자동 설정됨
        await cart.add();  // 장바구니에 추가

        return cart;  // 추가된 장바구니 객체 반환
    }

    // 특정 장바구니 조회
    static async getCartById(cart_id) {
        return await Cart.findByCartId(cart_id);
    }

    // 유저의 장바구니 조회
    static async getCartByUserId(user_id) {
        return await Cart.findByUserId(user_id);
    }

    // 장바구니 수량 업데이트
    static async updateCart(cart_id, user_id, quantity) {
        const cart = new Cart(cart_id, user_id, null, quantity, null);
        return await cart.update();
    }

    // 장바구니 아이템 삭제
    static async removeFromCart(cart_id, user_id) {
        return await Cart.delete(cart_id, user_id);
    }
}

module.exports = CartService;