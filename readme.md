# query-string-cli

**Decode & encode URL query strings in the command line.**

[![npm version](https://img.shields.io/npm/v/query-string-cli.svg)](https://www.npmjs.com/package/query-string-cli)
[![build status](https://img.shields.io/travis/derhuerst/query-string-cli.svg)](https://travis-ci.org/derhuerst/query-string-cli)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/query-string-cli.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install -g query-string-cli
```


## Usage

```
Usage:
    decode-query-string [--json] <encoded-query-string>
Options:
    --json  -j  Print JSON instead of an eve-friendly version.
Examples:
    decode-query-string 'foo[bar]=A&baz[0]=B&baz[1]=C'
```

```
Usage:
    encode-query-string [--no-encoding] <json>
Options:
    --no-encoding   -n  Don't URL-encode the result.
    --dot-notation  -d  Use the "a.b" notation for objects.
Examples:
    encode-query-string -nd '{"foo": {"bar": "A"}, "baz": ["B", "C"]}'
```


## Contributing

If you have a question or have difficulties using `query-string-cli`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/query-string-cli/issues).
