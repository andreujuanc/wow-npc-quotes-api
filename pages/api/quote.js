import fetch from 'node-fetch'
import jsdom from 'jsdom'

let CACHED_DATA = [];
let domPage;

export default async (req, res) => {

    res.statusCode = 500

    const npcPageRequest = await fetch('https://wow.gamepedia.com/api.php?action=parse&page=NPC_quotes&format=json')
    if (npcPageRequest.ok) {
        
        if (CACHED_DATA.length < 1) {
            console.log('Init data');
            const jsonData = await npcPageRequest.json()
            const content = jsonData.parse.text['*']
            /*const */ domPage = new jsdom.JSDOM(content)
            
        }   
        
        const quotes = domPage.window.document.querySelectorAll('div.mw-parser-output > ul > li')
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        CACHED_DATA = Object.values(quotes).map(x => x.textContent)

        const random = parseInt(Math.random() * CACHED_DATA.length)
        res.end(CACHED_DATA[random])
    }
}