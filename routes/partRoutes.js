const express = require('express');
const { searchParts, getPartDetail } = require('../controllers/partController');
const router = express.Router();

//부품root: http://localhost:5500/api/parts


router.get('/search', searchParts);

router.get('/detail/:part_id', getPartDetail);

module.exports = router;
