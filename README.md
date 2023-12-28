# Epic Free Games
<!-- Small scraping service for getting free games on Epic Games -->
REST API for providing list of current FREE games in Epic Games Store

### Response
```json
{
  "code": 200,
  "message": "SUCCESS",
  "data": {
    "free_games": [
      {
        "name": "Cursed to Golf",
        "status": "Free Now",
        "date": "Dec 28 at 10:00 AM",
        "game_url": "https://store.epicgames.com/en-US/p/cursed-to-golf-a6bc22",
        "cover_url": "https://cdn1.epicgames.com/offer/d5241c76f178492ea1540fce45616757/Free-Game-9_1920x1080-418a8fa10dd305bb2a219a7ec869c5ef?h=480&quality=medium&resize=1&w=854"
      },
      {
        "name": "Unlocking in 00:05:39:55",
        "status": "Coming Soon",
        "date": null,
        "game_url": "https://store.epicgames.com/en-US/sales-and-specials/holiday-sale",
        "cover_url": "https://cdn1.epicgames.com/offer/d5241c76f178492ea1540fce45616757/Free-Game-10-teaser_1920x1080-3ea48042a44263bf1a0a59c725b6d95b?h=480&quality=medium&resize=1&w=854"
      }
    ]
  },
  "meta": {
    "total": 2,
    "lastUpdate": "2023-12-28T10:20:04.300Z"
  }
}
```

LIVE API:
`GET | https://efg.cipta.dev`
