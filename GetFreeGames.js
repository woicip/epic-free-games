const playwright = require('playwright');
const url = 'https://store.epicgames.com/en-US/free-games';

async function GetFreeGames(){
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    await page.waitForSelector('.css-1myhtyb');
    const freeGamesContainer = await page.$('.css-1myhtyb')

    try {
        const games = await freeGamesContainer.$$eval('.css-hkjq8i', (nodes) => nodes.map(node => node.innerText))
        const gameStatus = await freeGamesContainer.$$eval('.css-1magkk1', (nodes) => nodes.map(node => node.innerText))
        const covers = await freeGamesContainer.$$eval('img', (nodes) => nodes.map((node) => node.src))
        const urls = await freeGamesContainer.$$eval('a', (nodes) => nodes.map(node => node.href))

        const data = games.map((game, index) => {
            const [ name, status ] = game.split('\n');
            return { status: gameStatus[index], name, date: status, cover: covers[index], url: urls[index] }
        })

        await browser.close();
        return data;

    } catch(err){
        await browser.close();
        throw new Error("[!] Something went wrong when getting requested data");
    }
}

GetFreeGames()

// module.exports = GetFreeGames;
