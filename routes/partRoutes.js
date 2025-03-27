const express = require('express');
const { searchParts, getPartDetail } = require('../controllers/partController');
const router = express.Router();

router.get('/search', searchParts);

router.get('/detail/:part_id', getPartDetail);

module.exports = router;
