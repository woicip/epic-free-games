const playwright = require('playwright');
const url = 'https://store.epicgames.com/en-US/free-games';

async function GetFreeGames(){
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    await page.waitForSelector('.css-1myhtyb');
    const freeGamesContainer = page.locator('.css-1myhtyb').nth(0)

    try {
        const games = await freeGamesContainer.evaluateAll((nodes) => nodes.map((node) => node.innerText));
        const covers = await freeGamesContainer.evaluateAll((nodes) => nodes.map((node) => {
            console.log(node)
            return node.querySelector('img').src
        }));
        const urls = await freeGamesContainer.evaluate((nodes) => nodes.querySelectorAll('a'))

        console.log(games)
        console.log(covers)
        console.log(urls)

        // const data = games.map((game, index) => {
        //     const [ status, name, date ] = game.split('\n');
        //     return { status, name, date: date.split('Free ')[1], cover: covers[index], url: urls[index] }
        // })
        
        await browser.close();
        // return data;

    } catch(err){
        console.log(err)
        await browser.close();
        throw new Error("[!] Something went wrong when getting requested data");
    }
}

<<<<<<< HEAD
GetFreeGames()

// module.exports = GetFreeGames;
=======
module.exports = GetFreeGames;
>>>>>>> e97b35c8ba59dccfb805b251a2e093224a16b9c9
