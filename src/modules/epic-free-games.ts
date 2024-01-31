import playwright from "playwright"
const url = 'https://store.epicgames.com/en-US/free-games';

function removeTags(str: string) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
 
    return str.replace(/(<([^>]+)>)/ig, '');
}

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
        const covers = await freeGamesContainer.$$eval('img', (nodes) => nodes.map((node) => node.src))
        const urls = await freeGamesContainer.$$eval('a', (nodes) => nodes.map(node => node.href))
        const status = await freeGamesContainer.$$eval('.css-1magkk1 > .css-1avc5a3', (nodes) => nodes.map(node => node.textContent)) as string[]
        const gameDates = await freeGamesContainer.$$eval('.css-hkjq8i > span[data-testid="offer-title-info-subtitle"] > span', (nodes) => nodes.map(node => node.innerHTML)) as string[]
        const gameDatesParsed = gameDates.map(game => removeTags(game))

        const data = gameNames.map((name, index) => ({
            name,
            status: status[index],
            date: gameDatesParsed[index],
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