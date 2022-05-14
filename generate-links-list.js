import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";


let url = `https://en.wiktionary.org/wiki/Appendix:Ukrainian_Swadesh_list`


// download a (random) Swadesh list page containing links to all the Swadesh list pages
let response = await fetch(url)
let html = await response.text()
let document = new DOMParser().parseFromString(html, 'text/html')


// Find the <th> containing the text “Individual languages”
let individualLanguagesTH = Array.from(document.querySelectorAll('th'))
  .find(th => th.textContent.trim() == 'Individual languages')

// traverse DOM to next paragraph, which contains all the <a>s we want
let linkP = individualLanguagesTH.parentElement.nextElementSibling.querySelector('p')

// convert each <a> into an object like { url, language }
let links = Array.from(linkP.querySelectorAll('p a'))
  .map(a => ({
      url: new URL(a.getAttribute('href'), 'http://en.wiktionary.org/').href,
      language: a.textContent,
      htmlFileName: `${a.textContent}.html`

    })
  )
  .sort(({language:a}, {language:b}) => a < b ? -1 : 1)
  
// since we got the links from this page, we have to fix the url for that link
links
  .find(({language}) => language == 'Ukrainian')
  .url = `http://en.wiktionary.org/wiki/Appendix:Ukrainian_Swadesh_list`

// add some metadata and save the file
let swadeshListPages = {
    "metadata": {
      "title": "Links to Swadesh list pages on Wiktionary",
      "source": "Wiktionary",
      "url": "https://en.wiktionary.org/wiki/Appendix:Ukrainian_Swadesh_list",
      "generatedBy": "generate-links-list.js"
    },
    links
}

Deno.writeTextFileSync('swadesh-list-page-links.json', JSON.stringify(swadeshListPages, null, 2))

