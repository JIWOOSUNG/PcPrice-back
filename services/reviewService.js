const Review = require('../models/Review');
const PartService = require('../services/partService'); // 부품 정보를 가져오기 위해 추가

class ReviewService {
    // 리뷰 작성
    static async createReview(part_id, user_id, rating, content) {
        // 부품 정보 가져오기 (part_name 조회)
        const part = await PartService.getPartById(part_id);
        if (!part) throw new Error('부품을 찾을 수 없습니다.');

        // part_name을 포함하여 리뷰 생성
        const review = new Review(null, part_id, part.name, user_id, rating, content, new Date());
        await review.save();
        return review;
    }

    // 특정 부품의 리뷰 조회
    static async getReviewsByPart(part_id) {
        const reviews = await Review.findByPartId(part_id);
        return reviews.length > 0 ? reviews : []; // ✅ 리뷰가 없으면 빈 배열 반환
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
