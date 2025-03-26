const { getParts } = require('../services/partService');

async function searchParts(req, res) {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ error: '검색어를 입력하세요' });

        const parts = await getParts(query);
        res.json(parts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
}

module.exports = { searchParts };
