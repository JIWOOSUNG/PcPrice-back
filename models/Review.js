const db = require('../config/db');

class Review {
    constructor(review_id, part_id, user_id, rating, content, created_at) {
        this.review_id = review_id;
        this.part_id = part_id;
        this.user_id = user_id;
        this.rating = rating;
        this.content = content;
        this.created_at = created_at;
    }

    // 리뷰 저장
    async save() {
        const [result] = await db.pool.execute(
            `INSERT INTO reviews (part_id, user_id, rating, content) 
             VALUES (?, ?, ?, ?)`,
            [this.part_id, this.user_id, this.rating, this.content]
        );
        this.review_id = result.insertId;
    }

    // 특정 부품에 대한 모든 리뷰 조회
    static async findByPartId(part_id) {
        const [rows] = await db.pool.execute(
            `SELECT r.*, u.name AS user_name 
             FROM reviews r 
             JOIN members u ON r.user_id = u.user_id 
             WHERE r.part_id = ?`,
            [part_id]
        );
        return rows;
    }

    // 특정 리뷰 삭제 (본인만 가능)
    static async deleteById(review_id, user_id) {
        const [result] = await db.pool.execute(
            `DELETE FROM reviews WHERE review_id = ? AND user_id = ?`,
            [review_id, user_id]
        );
        return result.affectedRows > 0; 
    }

    //리뷰 수정 (본인만 가능)
    async update() {
        const [result] = await db.pool.execute(
            `UPDATE reviews SET rating = ?, content = ? WHERE review_id = ? AND user_id = ?`,
            [this.rating, this.content, this.review_id, this.user_id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Review;
