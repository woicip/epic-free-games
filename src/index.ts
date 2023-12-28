import express, { Request, Response } from "express";
import cron from "node-cron";

// modules
import { timestamp } from './modules/timestamp';
import { getGames, db } from './modules/get-games';
import { config } from './config/config';

const app = express();

cron.schedule('*/10 * * * *', () => {
    timestamp()
    getGames()
})

app.get('/', async (req: Request, res: Response) => {
    try {
        const { lastUpdate, games } = await db.getData('efg')

        res.status(200).send({ 
            code: 200, 
            message: "SUCCESS", 
            data: {
                free_games: games,
            },
            meta: { 
                total: games.length, 
                lastUpdate 
            } 
        });

    } catch(err){
        res.status(500).send({ 
            code: 500, 
            message: "Something went wrong when getting requested resource.", 
            games: null 
        });
    }
});

app.listen(config.PORT, () => {
    getGames()
    console.log('Epic Free Games service is running at http://localhost:3303')
});