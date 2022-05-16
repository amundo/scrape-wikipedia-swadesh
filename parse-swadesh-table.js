
let parseFormsTD = td => {
  let termSPANS = Array.from(td.querySelectorAll('.swadesh-term'))

  let words = termSPANS.map(termSPAN => {
    let form 
    let orthographic
  
    if(td.querySelector('.tr[lang]')){
      form = td.querySelector('.tr[lang]').textContent.trim()
      orthographic = td.querySelector('span[lang] a').textContent.trim()
    } else {
       form = td.querySelector('span[lang] a').textContent.trim()
       orthographic = form
    }

    return { form, orthographic}
  })

  return words
}

let parse = table => {
  let tbody = table.querySelector('tbody')
  let rows = Array.from(tbody.querySelectorAll('tr'))
    .filter(row => row.querySelector('td'))

  let words = rows.map(row => {
    let cells = Array.from(row.children)
    let [numberTD, glossTD, formsTD, ipaTD] = cells

    let number = numberTD.textContent.trim()
    let gloss = glossTD.textContent.trim()
    let words = parseFormsTD(formsTD)

    return words.map(({form,orthographic}) => ({
      form,
      orthographic,
      gloss,
      // metadata: {swadeshNumber: number}
    }))
  })
  return words.flat()

}
  
export {
  parse
}