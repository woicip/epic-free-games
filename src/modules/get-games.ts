import { JsonDB, Config } from 'node-json-db';
import { EpicFreeGames } from "./epic-free-games"

const cconfig = new Config("efg", true, false, "/")
const db = new JsonDB(cconfig)

async function getGames(){
    try {
        const result = await EpicFreeGames()
        await db.push("efg", { lastUpdate: new Date(), games: result })
        console.log("Game list Updated ✔")

    } catch(error){
        throw error
    }
}

export {
    getGames,
    db
}