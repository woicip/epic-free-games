const playwright = require('playwright');
const url = 'https://store.epicgames.com/en-US/free-games';

async function GetFreeGames(){
    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'
    });

    const page = await context.newPage();
    await page.goto(url);

    await page.waitForSelector('.css-1myhtyb');
    const freeGamesContainer = await page.$('.css-1myhtyb');
    
    try {
        const games = await freeGamesContainer.$$eval('.css-1ukp34s', nodes =>  nodes.map((n) => n.innerText))
        const covers = await freeGamesContainer.$$eval('img', (nodes) => nodes.map(n => n.src))
        const urls = await freeGamesContainer.$$eval('a', (nodes) => nodes.map(n => n.href))

        const data = games.map((game, index) => {
            const [ status, name, date ] = game.split('\n');
            return { status, name, date: date.split('Free ')[1], cover: covers[index], url: urls[index] }
        })
        
        await browser.close();
        return data;

    } catch(err){
        await browser.close();
        throw new Error("[!] Something went wrong when getting requested data");
    }
}

module.exports = GetFreeGames;
