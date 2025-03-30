const ReviewService = require('../services/reviewService');

const reviewController = {
    // 리뷰 작성
    createReview: async (req, res) => {
        try {
            const { part_id, user_id, rating, content } = req.body;
            if (!part_id || !user_id || rating === undefined) {
                return res.status(400).json({ error: ' part_id, user_id, rating은 필수 입력값입니다.' });
            }

            const review = await ReviewService.createReview(part_id, user_id, rating, content);
            res.status(201).json({ message: '리뷰 작성 완료', review });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 특정 부품의 리뷰 조회
    getReviewsByPart: async (req, res) => {
        try {
            const { part_id } = req.params;
            if (!part_id) {
                return res.status(400).json({ error: ' part_id를 입력하세요.' });
            }

            const reviews = await ReviewService.getReviewsByPart(part_id);
            res.status(200).json({ message: '리뷰 조회 성공', reviews });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 리뷰 수정
    updateReview: async (req, res) => {
        try {
            const { review_id } = req.params;
            const { user_id, rating, content } = req.body;

            if (!review_id || !user_id || rating === undefined || !content) {
                return res.status(400).json({ error: 'review_id, user_id, rating, content는 필수 입력값입니다.' });
            }

            const success = await ReviewService.updateReview(review_id, user_id, rating, content);
            if (!success) {
                return res.status(403).json({ error: '한이 없습니다.' });
            }

            res.status(200).json({ message: '리뷰 수정 완료' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // 리뷰 삭제
    deleteReview: async (req, res) => {
        try {
            const { review_id } = req.params;
            const { user_id } = req.body;

            if (!review_id || !user_id) {
                return res.status(400).json({ error: 'review_id와 user_id는 필수입니다.' });
            }

            const success = await ReviewService.deleteReview(review_id, user_id);
            if (!success) {
                return res.status(403).json({ error: '삭제 권한이 없습니다.' });
            }

            res.status(200).json({ message: '리뷰 삭제 완료' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = reviewController;
