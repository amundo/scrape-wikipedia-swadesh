import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";


let links = JSON.parse(Deno.readTextFileSync('swadesh-list-page-links.json'))

let saveLexiconHTML = async ({url,html}) => {
  let languageName = getLanguageNameFromURL(url)
  let htmlFileName = `${languageName}.html`
  await Deno.writeTextFile(`html/${htmlFileName}`, html)
}

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

let mirrorHTML = async links => {
  console.log(`downloading ${links.links.length} links`)
  for await(let link of links.links){
    console.log(`Downloading ${link.htmlFileName}`)
    let response = await fetch(link.url)
    let html = await response.text()
    await Deno.writeTextFile(`html/${link.htmlFileName}`, html)
  }
}

mirrorHTML(links)

