#!/usr/bin/env node
'use strict'

const mri = require('mri')
const {stringify} = require('qs')

const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'version', 'v',
		'no-encoding', 'n',
		'dot-notation', 'd'
	]
})

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    encode-query-string [--no-encoding] <json>
Options:
    --no-encoding   -n  Don't URL-encode the result.
    --delimiter         Character between key/value pairs. Default: &
    --dot-notation  -d  Use the "a.b" notation for objects.
    --array-format      How to encode arrays. Default: indices
                          indices, brackets, repeat, comma
Examples:
    encode-query-string -nd '{"foo": {"bar": "A"}, "baz": ["B", "C"]}'
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`encode-query-string v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const json = argv._[0]
if (!json) {
	showError('Missing json parameter.')
}

const parsed = JSON.parse(json)

const rendered = stringify(parsed, {
	encode: !(argv['no-encoding'] || argv.n),
	delimiter: argv.delimiter || '&',
	allowDots: argv['dot-notation'] || argv.d,
	arrayFormat: argv['array-format'] || 'indices'
})
process.stdout.write(rendered + '\n')
