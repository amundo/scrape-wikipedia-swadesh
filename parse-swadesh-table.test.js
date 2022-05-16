import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import {
  parse
} from './parse-swadesh-table.js'

import { 
  equal,
  assert,
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
  assertStringIncludes,
  assertMatch,
  assertNotMatch,
  assertArrayIncludes,
  assertObjectMatch,
  assertThrows,
  assertThrowsAsync } from "https://deno.land/std@0.95.0/testing/asserts.ts"

let ukrainianTable = new DOMParser().parseFromString(`
<table><tbody>			

<tr>
<td>39</td>
<td><a href="/wiki/child" title="child">child</a></td>
<td>
  <span class="swadesh-term">
    <span class="Cyrl" lang="uk">
      <a href="/wiki/%D0%B4%D0%B8%D1%82%D0%B8%D0%BD%D0%B0#Ukrainian" title="дитина">дити́на</a>
    </span>
    <span class="mention-gloss-paren annotation-paren">(</span>
    <span lang="uk-Latn" class="tr Latn">dytýna</span>
    <span class="mention-gloss-paren annotation-paren">)</span>
  </span>
</td>
<td></td>
</tr>
<tr>
  <td>17</td>
  <td><a href="/wiki/all" title="all">all</a></td>
  <td>
    <span class="swadesh-term">
      <span class="Cyrl" lang="uk">
        <a href="/wiki/%D1%83%D1%81%D0%B5#Ukrainian" title="усе">усе́</a>
      </span> 
      <span class="mention-gloss-paren annotation-paren">(</span>
      <span class="tr Latn" lang="uk-Latn">usé</span>
      <span class="mention-gloss-paren annotation-paren">)</span>
    </span>, 
    <span class="swadesh-term">
      <span class="Cyrl" lang="uk">
        <a href="/wiki/%D0%B2%D1%81%D0%B5#Ukrainian" title="все">все</a>
      </span>
      <span class="mention-gloss-paren annotation-paren">(</span>
      <span class="tr Latn" lang="uk-Latn">vse</span>
      <span class="mention-gloss-paren annotation-paren">)</span>
    </span>,
  <span class="swadesh-term"><span class="Cyrl" lang="uk"><a href="/w/index.php?title=%D1%83%D1%81%D1%96&amp;action=edit&amp;redlink=1" class="new" title="усі (page does not exist)">усі́</a></span> <span class="mention-gloss-paren annotation-paren">(</span><span class="tr Latn" lang="uk-Latn">usí</span><span class="mention-gloss-paren annotation-paren">)</span></span>,
  <span class="swadesh-term"><span class="Cyrl" lang="uk"><a href="/wiki/%D0%B2%D1%81%D1%96#Ukrainian" title="всі">всі</a></span> <span class="mention-gloss-paren annotation-paren">(</span><span class="tr Latn" lang="uk-Latn">vsi</span><span class="mention-gloss-paren annotation-paren">)</span></span></td>
  <td></td>
</tr>
</tbody>
</table>

`, 'text/html')

let welshTable = new DOMParser().parseFromString(`				
<table><tbody>			
<tr>
<td>39</td>
<td><a href="/wiki/child" title="child">child</a></td>
<td>
  <span class="swadesh-term">
    <span class="Latn" lang="cy">
      <a href="/wiki/plant#Welsh" title="plant">plant</a>
    </span>
  </span>
</td>
<td></td>
</tr>
</tbody>
</table>
`, `text/html`)

Deno.test("Welsh word", () => {
  let words = parse(welshTable)
  let child = words.find(word => word.gloss == 'child') 
  assertEquals(child, {
    form: "plant",
    gloss: "child",
    orthographic: "plant"
  })
})

Deno.test("Ukrainian word", () => {
  let words = parse(ukrainianTable)
  let child = words.find(word => word.gloss == 'child') 
  assertEquals(child, {
    form: "dytýna",
    gloss: "child",
    orthographic:"дити́на"
  })
})


