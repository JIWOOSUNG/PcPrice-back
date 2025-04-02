const { getParts } = require('../services/partService');
const Part = require('../models/Part');

// ✅ 부품 검색 API
async function searchParts(req, res) {
    try {
        const { query } = req.query;  
        if (!query) return res.status(400).json({ error: '검색어를 입력하세요.' });

        const parts = await getParts(query);
        if (!parts || parts.length === 0) {
            return res.status(404).json({ error: '검색 결과가 없습니다.' });
        }

        res.json(parts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
}

// ✅ 부품 상세 조회 API (name 기준으로 조회)
async function getPartDetail(req, res) {
    try {
        const { name } = req.query;  // URL 쿼리에서 name 받기
        if (!name) {
            return res.status(400).json({ error: '부품 이름을 입력하세요.' });
        }

        const decodedName = decodeURIComponent(name);

        // name으로 부품 조회
        const part = await Part.findOne({ where: { name: decodedName } });
        if (part) {
            res.json(part);
        } else {
            res.status(404).json({ error: '부품을 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('부품 조회 중 오류 발생:', error);
        res.status(500).json({ error: '서버 오류' });
    }
}


module.exports = { searchParts, getPartDetail };
