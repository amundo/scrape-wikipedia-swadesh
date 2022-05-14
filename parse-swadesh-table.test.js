import {parseSwadeshTable, parseSwadeshTermSPAN, parseTermsTD} from './match.js'
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

let ukrainianTR = `

`

Deno.test("identical objects", () => 
  assert(match(
    {"form": "gato"}, 
    {"form": "gato"}
  ))
)

