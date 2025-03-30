const db = require('../config/db');

class Cart {
    constructor(cart_id, user_id, part_id, quantity, added_at) {
        this.cart_id = cart_id;
        this.user_id = user_id;
        this.part_id = part_id;
        this.quantity = quantity;
        this.added_at = added_at;
    }

    // 장바구니 상품 추가
    async add() {
        const [result] = await db.pool.execute(
            `INSERT INTO carts (part_id, user_id, quantity) VALUES (?, ?, ?)`,
            [this.part_id, this.user_id, this.quantity]
        );
        this.cart_id = result.insertId;
    }

    // 특정 장바구니 조회
    static async findByCartId(cart_id) {
        const [rows] = await db.pool.execute(
            `SELECT c.*, p.name AS part_name, p.price
            FROM carts c
            JOIN parts p ON c.part_id = p.part_id
            WHERE c.cart_id = ?`,
            [cart_id]
        );
        return rows;
    }

    // 유저 장바구니 조회
    static async findByUserId(user_id) {
        const [rows] = await db.pool.execute(
            `SELECT c.*, p.name AS part_name, p.price
            FROM carts c
            JOIN parts p ON c.part_id = p.part_id
            WHERE c.user_id = ?`,
            [user_id]
        );
        return rows;
    }

    // 장바구니 수량 수정
    async update() {
        const [result] = await db.pool.execute(
            `UPDATE carts SET quantity = ? WHERE cart_id = ? AND user_id = ?`,
            [this.quantity, this.cart_id, this.user_id]
        );
        return result.affectedRows > 0;
    }

    // 장바구니 삭제
    static async delete(cart_id, user_id) {
        const [result] = await db.pool.execute(
            `DELETE FROM carts WHERE cart_id = ? AND user_id = ?`,
            [cart_id, user_id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Cart;
