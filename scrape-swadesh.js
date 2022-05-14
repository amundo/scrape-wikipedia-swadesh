import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import {parseSwadeshTable} from './parse-swadesh-table.js'


let getLanguageNameFromURL = url => url
  .split("/")
  .pop()
  .split(':')[1]
  .replaceAll('_', ' ')
  .replace(' Swadesh list', '')


let buildLexicon = async ({url,dom}) => {
  
  let metadata = {
    title: getLanguageNameFromURL(url) + ' Swadesh list',
    language: getLanguageNameFromURL(url),
    source: "Wikipedia",
    url	,
    notes: [
      "Parsed from HTML with https://github.com/amundo/scrape-wikipedia-swadesh/"
    ]
  }
  
  let table = dom.querySelector('table')

  let words = parseSwadeshTable(table)
    .flat()

  return {metadata, words}
}

let saveLexicon = async lexicon => {
  let fileName = `${lexicon.metadata.language.toLowerCase().replaceAll(' ', '_')}_swadesh-lexicon.json`

  await Deno.writeTextFile(`data/${fileName}`, JSON.stringify(lexicon,null,2))
}

let links = JSON.parse(Deno.readTextFileSync('swadesh-list-page-links.json'))

// not sure why these are failing yet
let troubleLanguages = [
  "Burmese",
  "Old Chinese",
  "Irish",
  "Japanese",
  "Korean",
  "Middle Korean",
  "Ojibwe",
  "Purepecha",
  "Thai"
]

links.links = links.links.filter(link => !troubleLanguages.includes(link.language))

let scrapeWikipedia = async links => {
  for await(let link of links.links){

    let html = await Deno.readTextFile(`html/${link.htmlFileName}`)
    
    let dom = new DOMParser().parseFromString(html, 'text/html')

    try {
      let lexicon = await buildLexicon({url:link.url,dom})
      if(lexicon.words.length){
        await saveLexicon(lexicon)
      }
    } catch(e){
      console.log(`Error in ${link.language}`)
    }
  }
}

scrapeWikipedia(links)

