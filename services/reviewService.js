const db = require('../config/db');

class ReviewService {
    // ✅ 리뷰 작성
    static async createReview(part_id, user_id, rating, content) {
        const [result] = await db.pool.execute(
            `INSERT INTO reviews (part_id, user_id, rating, content) VALUES (?, ?, ?, ?)`,
            [part_id, user_id, rating, content]
        );
        return { review_id: result.insertId, part_id, user_id, rating, content };
    }

    // ✅ 특정 부품의 리뷰 조회
    static async getReviewsByPart(part_id) {
        const [reviews] = await db.pool.execute(
            `SELECT r.*, u.name AS user_name 
             FROM reviews r 
             JOIN members u ON r.user_id = u.user_id 
             WHERE r.part_id = ?`,
            [part_id]
        );
        return reviews;
    }

    // ✅ 리뷰 업데이트 (본인만 가능)
    static async updateReview(review_id, user_id, rating, content) {
        const [result] = await db.pool.execute(
            `UPDATE reviews SET rating = ?, content = ? WHERE review_id = ? AND user_id = ?`,
            [rating, content, review_id, user_id]
        );
        return result.affectedRows > 0;
    }

    // ✅ 리뷰 삭제 (본인만 가능)
    static async deleteReview(review_id, user_id) {
        const [result] = await db.pool.execute(
            `DELETE FROM reviews WHERE review_id = ? AND user_id = ?`,
            [review_id, user_id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = ReviewService;
