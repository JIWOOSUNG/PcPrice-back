const { scrapeParts } = require('../scrapers/danawaScraper');
const Part = require('../models/Part');

async function getParts(searchQuery) {
    const parts = await scrapeParts(searchQuery);

    console.log("🔍 크롤링된 데이터:", parts); // 크롤링된 데이터 확인

    if (!parts || parts.length === 0) {
        throw new Error("크롤링된 데이터가 없습니다.");
    }

    for (const part of parts) {
        const partData = {
            name: part.name,
            manufacturer: part.manufacturer,
            price: part.price,
            productUrl: part.productUrl,
            imageUrl: part.imageUrl,
            specList: part.specList ? part.specList.trim() : ""
        };

        console.log("저장할 데이터:", partData); //디버깅용

        await Part.findOrCreate({
            where: { name: part.name },
            defaults: partData
        }).then(([partRecord, created]) => {
            if (!created) {
                return partRecord.update(partData);
            }
        });
    }

    return parts;
}


async function getPartById(partId) {
    try {
        const part = await Part.findByPk(partId);  // 기본키(part_id)로 부품을 조회
        if (part) {
            console.log(part);  // 부품을 콘솔에 출력
            return part;  // 부품 반환
        } else {
            console.log('부품을 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('부품 조회 중 오류 발생:', error);
    }
}
module.exports = { getParts, getPartById };
