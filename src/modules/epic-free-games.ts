import playwright from "playwright"
const url = 'https://store.epicgames.com/en-US/free-games';

export async function EpicFreeGames(){
    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'
    });

    const page = await context.newPage();
    await page.goto(url);

    await page.waitForSelector('.css-1myhtyb');
    const freeGamesContainer = await page.$('.css-1myhtyb') as playwright.ElementHandle

    try {
        const gameNames = await freeGamesContainer.$$eval('.css-hkjq8i > div[data-testid="offer-title-info-title"]', (nodes) => nodes.map(node => node.textContent)) as string[]
        const gameStatus = await freeGamesContainer.$$eval('.css-hkjq8i > span[data-testid="offer-title-info-subtitle"]', (nodes) => nodes.map(node => node.textContent)) as string[]
        const covers = await freeGamesContainer.$$eval('img', (nodes) => nodes.map((node) => node.src))
        const urls = await freeGamesContainer.$$eval('a', (nodes) => nodes.map(node => node.href))

        const data = gameNames.map((name, index) => ({ 
            name,
            status: gameStatus[index] ? gameStatus[index]?.split(" - ")[0] : "Coming Soon", 
            date: gameStatus[index] ? gameStatus[index].split(" - ")[1] : null, 
            game_url: urls[index],
            cover_url: covers[index]
        }))

        await browser.close();
        return data;

    } catch(err){
        await browser.close();
        throw err
    }
}