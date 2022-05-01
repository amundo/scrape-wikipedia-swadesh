let parseForms = cell => cell
  .split`,`
  .map(x => x.trim())
	.map(pair => pair
    .slice(0,-1)
    .split(' ('))
  	  .map(([ru, rulat]) => ({
        orthographic: ru,
        form: rulat
      })
  )

let parseRow = row => {
  let tds = Array.from(row.querySelectorAll('td'))

  let id = tds[0].textContent
  let gloss = tds[1].textContent
  let forms = parseForms(tds[2].textContent)
  
  return forms.map(({form,orthographic}) => ({form, gloss, orthographic, metadata: {swadeshNumber: id}}))
}
  
let parseSwadeshTable = table => {
  table.querySelectorAll('a')
    .forEach(a => a.innerHTML = a.textContent)

  let words = []

  Array.from(table.querySelectorAll('tr'))
    .filter(tr => tr.querySelector('td') && tr.textContent.trim().length > 3)
    .forEach(tr => 
      words.push(...parseRow(tr))
    )

  return words
}
  
export {parseSwadeshTable}