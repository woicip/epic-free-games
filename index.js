const express = require('express');
const app = express();
const GetFreeGames = require('./GetFreeGames');

app.get('/', async (req, res) => {
    try {
        const games = await GetFreeGames();
        res.send({ code: 200, message: "SUCCESS", games });

    } catch(err){
        res.send({ code: 500, message: "Something went wrong when requested rsource", games: null });
    }
});

app.listen(3303, () => console.log('Epic Free Games service is running at http://localhost:3303'));