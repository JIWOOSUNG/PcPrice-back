const express = require('express');
const { searchParts, getPartDetail } = require('../controllers/partController');
const router = express.Router();

// 부품 검색 API
router.get('/search', searchParts);

// ✅ 상세 조회: URL 파라미터 → 쿼리 스트링 (`?imageUrl=...` 형태)
router.get('/detail', getPartDetail);

module.exports = router;
