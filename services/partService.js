const { scrapeParts } = require('../scrapers/danawaScraper');
const Part = require('../models/Part');

async function getParts(searchQuery) {
    const parts = await scrapeParts(searchQuery);

    console.log("🔍 크롤링된 데이터:", parts);

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

        console.log("저장할 데이터:", partData);

        // ✅ 중복 확인 (name 기준으로 중복 검사)
        const existingPart = await Part.findOne({ where: { name: part.name } });

        if (!existingPart) {
            await Part.create(partData);
            console.log(`✅ 저장 완료: ${part.name}`);
        } else {
            console.log(`⚠️ 중복 데이터 존재: ${part.name}, 저장하지 않음.`);
        }
    }

    return parts;
}

// ✅ 부품 상세 조회 (name 기준)
async function getPartDetail(name) {
    if (!name) throw new Error("부품 이름이 필요합니다.");

    const part = await Part.findOne({ where: { name } });
    if (!part) throw new Error("부품을 찾을 수 없습니다.");

    return part;
}

module.exports = { getParts, getPartDetail };
