const Review = require('../models/Review');

class ReviewService {
    // 리뷰 작성
    static async createReview(part_id, user_id, rating, content) {
        const review = new Review(null, part_id, user_id, rating, content, new Date());
        await review.save(); // 모델의 save() 메서드 호출
        return review;
    }

    // 특정 부품의 리뷰 조회
    static async getReviewsByPart(part_id) {
        return await Review.findByPartId(part_id);
    }

    // 리뷰 업데이트 (본인만 가능)
    static async updateReview(review_id, user_id, rating, content) {
        const review = new Review(review_id, null, user_id, rating, content, null);
        return await review.update();
    }

    // 리뷰 삭제 (본인만 가능)
    static async deleteReview(review_id, user_id) {
        return await Review.deleteById(review_id, user_id);
    }
}

module.exports = ReviewService;
