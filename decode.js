#!/usr/bin/env node
'use strict'

const mri = require('mri')
const {parse} = require('qs')
const {inspect} = require('util')

const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'version', 'v',
		'json', 'j',
		'no-dots',
		'no-comma',
		'no-arrays'
	]
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    decode-query-string [--json] <encoded-query-string>
Options:
    --json       -j  Print JSON instead of an eve-friendly version.
    --delimiter  -d  Character between key/value pairs. Default: &
    --no-dots        Don't parse \`a.b=foo\` dot notation.
    --no-comma       Don't parse \`a=foo,bar\` array notation.
    --no-arrays      Don't parse \`a[1]=foo\` array notation.
Examples:
    decode-query-string 'foo[bar]=A&baz[0]=B&baz[1]=C'
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`decode-query-string v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

let encoded = argv._[0]
if (!encoded) {
	showError('Missing encoded-query-string parameter.')
}
if (encoded[0] === '?') encoded = encoded.slice(1)

const delimiter = argv.delimiter || argv.d || '&'
const allowDots = argv.dots !== false
const comma = argv.comma !== false
const parseArrays = argv.arrays !== false

const decoded = parse(encoded, {
	delimiter, allowDots, comma, parseArrays,
	depth: Infinity, arrayLimit: Infinity
})

if (argv.json || argv.j) {
	process.stdout.write(JSON.stringify(decoded) + '\n')
} else {
	const rendered = inspect(decoded, {
		depth: Infinity,
		maxArrayLength: null,
		colors: true
	})
	process.stdout.write(rendered + '\n')
}
