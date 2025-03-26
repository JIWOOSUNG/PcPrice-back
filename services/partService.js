const { scrapeParts } = require('../scrapers/danawaScraper');
const Part = require('../models/Part');

async function getParts(searchQuery) {
    const parts = await scrapeParts(searchQuery);

    for (const part of parts) {
        const partData = {
            name: part.name,
            manufacturer: part.manufacturer,
            price: part.price,
            productUrl: part.productUrl, // ✅ 모델 속성명과 일치시킴
            imageUrl: part.imageUrl      // ✅ 모델 속성명과 일치시킴
        };

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

module.exports = { getParts };
