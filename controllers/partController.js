const { getParts,getPartById  } = require('../services/partService');

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

async function getPartDetail(req, res) {
    try {
        const partId = parseInt(req.params.part_id, 10);  // URL 파라미터에서 part_id를 가져오기
        console.log(partId)
        if (isNaN(partId)) {  // part_id가 유효한 숫자인지 확인
            console.log(partId)
            return res.status(400).json({ error: '유효한 ID를 입력하세요.' });  // 유효하지 않으면 400 에러 반환
            console.log(partId)
        }
        console.log(partId)
        // partId로 부품 조회
        const part = await getPartById(partId);
        console.log(partId)
        if (part) {
            res.json(part);  // 부품이 존재하면 JSON 형식으로 부품 정보 반환
        } else {
            res.status(404).json({ error: '부품을 찾을 수 없습니다.' });  // 부품이 없으면 404 에러 반환
        }
    } catch (error) {
        console.error('부품 조회 중 오류 발생:', error);
        res.status(500).json({ error: '서버 오류' });  // 오류 발생 시 500 에러 반환
    }
}

module.exports = { searchParts, getPartDetail };