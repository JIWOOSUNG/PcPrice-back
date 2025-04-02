const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

//리뷰root: http://localhost:5500/api/reviews

// 리뷰 작성
router.post('/post', reviewController.createReview);

// 특정 부품의 리뷰 조회
router.get('/detail/:part_name', reviewController.getReviewsByPart);

// 리뷰 수정
router.put('/update/:review_id', reviewController.updateReview);

// 리뷰 삭제
router.delete('/delete/:review_id', reviewController.deleteReview);

module.exports = router;
