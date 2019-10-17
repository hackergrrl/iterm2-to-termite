var fs = require('fs')
var plist = require('plist')

function toHex (parsedData) {
  var r = parseInt(Math.floor(parsedData['Red Component'] * 256)).toString(16)
  var g = parseInt(Math.floor(parsedData['Green Component'] * 256)).toString(16)
  var b = parseInt(Math.floor(parsedData['Blue Component'] * 256)).toString(16)
  return `#${r}${g}${b}`
}

var data = plist.parse(fs.readFileSync(process.argv[2], 'utf8'))

Object.entries(data).sort().forEach(function ([k,v]) {
  var m = k.match(/Ansi (\d+) Color/)
  if (m) console.log(`color${m[1]} = ${toHex(v)}`)

  var m = k.match(/Foreground Color/)
  if (m) console.log(`foreground = ${toHex(v)}`)

  var m = k.match(/Background Color/)
  if (m) console.log(`background = ${toHex(v)}`)

  var m = k.match(/Cursor Color/)
  if (m) console.log(`cursor = ${toHex(v)}`)

  var m = k.match(/Selection Color/)
  if (m) console.log(`highlight = ${toHex(v)}`)
})

