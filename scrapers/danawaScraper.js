const puppeteer = require('puppeteer');

async function scrapeParts(searchQuery) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const searchUrl = `https://search.danawa.com/dsearch.php?k1=${encodeURIComponent(searchQuery)}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });

    const parts = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('.prod_main_info').forEach((el) => {
            const name = el.querySelector('.prod_name a')?.innerText.trim();
            const manufacturer = name ? name.split(' ')[0].trim() : null;
            const price = el.querySelector('.price_sect strong')?.innerText.replace(/[^0-9]/g, '');
            const productUrl = el.querySelector('.prod_name a')?.href;
            const imageUrl = el.querySelector('.thumb_image img')?.src;

            if (name && price) {
                items.push({ name, manufacturer, price: parseFloat(price), productUrl, imageUrl });
            }
        });
        return items;
    });

    await browser.close();
    return parts;
}

module.exports = { scrapeParts };
