import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import {parseSwadeshTable} from './parse-swadesh-table.js'

let downloadSwadeshTable = async url => {
  let response = await fetch(url)
  let html = await response.text()
  let dom = new DOMParser().parseFromString(html, 'text/html')
  return dom
}

let buildLexicon = async url => {
  let dom = await downloadSwadeshTable(url)

  let title = url.split("/").pop().split(':')[1].replaceAll('_', ' ')

  let metadata = {
    title,
    language: title.replace(' Swadesh list', ''),
    source: "Wikipedia",
    url	
  }
  
  let table = dom.querySelector('table')

  let words = parseSwadeshTable(table)

  return {metadata, words}
}


let url = Deno.args[0]

buildLexicon(url)
  .then(lexicon => Deno.writeTextFileSync(`${lexicon.metadata.language.toLowerCase().replaceAll(' ', '_')}_swadesh-lexicon.json`, JSON.stringify(lexicon,null,2)))
