# scrape-wikipedia-swadesh

A deno script to extract JSON versions of Wikipedia Swadesh lists

## Deno

Deno is a cool command-line version of Javascript, like node, but IMHO much simpler and easier to understand. 

You can install it here:

https://deno.land/#installation

It takes no minutes and creates a single binary on your computer, and a `~/.deno` directory, which has all the deno things, so if you don’t like it just remove that folder.

## Wikipedia Swadesh lists

I wanted to compare Ukrainian and Russian (Слава Україні), so I looked for a Swadesh list on Wikipedia, and of course there are many, actually on Wiktionary:

* https://en.wiktionary.org/wiki/Appendix:Ukrainian_Swadesh_list
* https://en.wiktionary.org/wiki/Appendix:Russian_Swadesh_list

Those two happen to have exactly the same `HTML` structure, so parsing one will parse the other. 

I wrote a module which takes a DOM node as input, so that you can use it from your browser console if you want. Deno has a DOM parser implementation which is not perfect (you have to use some old-school Javascript to make it happy), but it works. So `download-swadesh-list.js` takes a URL on the command line, runs `parse-swadesh-list.js`, and saves it to a file named `<language>_swadesh-lexicon.json`. I have included the sample output `ukrainian_swadesh-lexicon.json` in this repo so you can see what the output looks like.

## Running it

> Note: I think I might redesign this to take URLs from a file rather than command-line arguments, but here’s how it works for now.

You do this on the console:

```bash
$ deno run --allow-write --allow-net  download-wikipedia-swadesh.js  https://en.wiktionary.org/wiki/Appendix:Ukrainian_Swadesh_list
```

You run a deno program with `deno run <flags> <program-file>`. Deno, unlike node, is “secure by default” — you have to give permission to your program to use the internet or write to or read from your filesystem when you run it. That’s what the two `--allow-write` and `--allow-net` flags are doing. Then there’s the program itself `download-wikipedia-swadesh.js`, and a URL, in this case `https://en.wiktionary.org/wiki/Appendix:Ukrainian_Swadesh_list`.

## On deck

Might as well see how many Swadesh lists we can extract with this thing. It’s guaranteed to run into problems in its current form on some of them, however, since some languages have different columns in their Swadesh tables ([Japanese](https://en.wiktionary.org/wiki/Appendix:Japanese_Swadesh_list), for instance.) Perhaps it’s worth modifying this to handle more languages. For now it might be easier to just find the ones that work for now. I dunno. 🤔
