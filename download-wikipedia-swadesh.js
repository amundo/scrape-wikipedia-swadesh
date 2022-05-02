import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import {parseSwadeshTable} from './parse-swadesh-table.js'


let buildLexicon = async ({url,dom}) => {
  let title = url.split("/").pop().split(':')[1].replaceAll('_', ' ')

  let metadata = {
    title,
    language: title.replace(' Swadesh list', ''),
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
  "Middle Korean"
]

links.links = links.links.filter(link => !troubleLanguages.includes(link.language))

for await(let link of links.links){
  console.log(link.language + ': ' + link.url)
  let response = await fetch(link.url)
  let html = await response.text()
  
  let dom = new DOMParser().parseFromString(html, 'text/html')

  let lexicon = await buildLexicon({url:link.url,dom})
  await saveLexicon(lexicon)
}




