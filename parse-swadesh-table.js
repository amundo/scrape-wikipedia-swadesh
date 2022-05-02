let parseSwadeshTermSPAN = span => {
  let labeledSelectors = [
    {
      "label": "orthographic",
      "selector": "[lang]:not(.tr)"
    },
    {
      "label": "form",
      "selector": "[lang].tr"
    },
    {
      "label": "note",
      "selector": ".swadesh-note"
    }
  ]

  let word = labeledSelectors.reduce((word, {label, selector}) => {
    if (span.querySelector(selector)) {
      word[label] = span.querySelector(selector).textContent
    } else {
      word[label] = ''
    }
    return word
  }, {})
  
  return word
}

let parseTermsTD = td => {
  let swadeshTerms = Array.from(td.querySelectorAll('.swadesh-term'))
  let words = swadeshTerms.map(swadeshTerm => parseSwadeshTermSPAN(swadeshTerm))
 
  return words
}
  
let parseSwadeshTable = table => {
  let tbody = table.querySelector('tbody')
  let rows = Array.from(tbody.querySelectorAll('tr'))

  rows = rows.filter(row => row.querySelector('td'))

  return rows.map(row => {
    let cells = Array.from(row.querySelectorAll('td'))
    let gloss = cells[1].textContent.trim()
    let metadata = {
      "swadeshNumber": cells[0].textContent.trim()
    }

    let words = parseTermsTD(cells[2])

    words = words.map(word => {
      return {
        gloss, 
        ...word
      }
    })

    return words
  })

}
  
export {parseSwadeshTable}