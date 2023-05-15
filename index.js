const express = require('express');
const app = express();
const { JsonDB, Config } = require('node-json-db');
const cron = require('node-cron')

// modules
const GetFreeGames = require('./GetFreeGames');

const config = new Config("efg", true, false, "/")
const db = new JsonDB(config)

async function getData(callback){
    const result = await GetFreeGames()
    await db.push("efg", { lastUpdate: new Date(), games: result })
    console.log("Game list Updated ✔")
}

cron.schedule('*/10 * * * *', () => {
    const dt = new Date()
    const date = dt.getDate()
    const month = dt.getMonth() + 1
    const year = dt.getFullYear()
    const hour = dt.getHours()
    const minutes = dt.getMinutes()
    const seconds = dt.getSeconds()
    console.log(`[${date.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} - ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}] Updating game list ...`)
    getData()
})

app.get('/', async (req, res) => {
    try {
        const { lastUpdate, games } = await db.getData('efg')
        res.status(200).send({ code: 200, message: "SUCCESS", games, meta: { total: games.length, lastUpdate } });

    } catch(err){
        res.status(500).send({ code: 500, message: "Something went wrong when getting requested resource", games: null });
    }
});

app.listen(3303, () => {
    getData()
    console.log('Epic Free Games service is running at http://localhost:3303')
});
