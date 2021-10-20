import fetch from 'node-fetch'
import jsdom from 'jsdom'

let CACHED_DATA = [];
let domPage;

export default async (req, res) => {

    res.statusCode = 500

    if (CACHED_DATA.length < 1) {
        const npcPageRequest = await fetch('https://wow.gamepedia.com/api.php?action=parse&page=NPC_quotes&format=json')
        if (npcPageRequest.ok) {
            console.log('Init data');
            const jsonData = await npcPageRequest.json()
            const content = jsonData.parse.text['*']
            /*const */ domPage = new jsdom.JSDOM(content)
            //res.end(content)
            
            const quotes = domPage.window.document.querySelectorAll('div.mw-parser-output > ul > li > ul > li')
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            CACHED_DATA = Object.values(quotes).map(x => x.textContent).filter(x=>x.length < 100)
        }
    }

    const random = parseInt(Math.random() * CACHED_DATA.length)
    // console.log(content)
    // res.end(content)
    res.json({
        quote: CACHED_DATA[random]
    })
}