#!/bin/sh -e

str1=$(./decode.js --json 'foo[bar]=A&baz[0]=B&baz[1]=C')
if [ $str1 != '{"foo":{"bar":"A"},"baz":["B","C"]}' ]; then
	>&2 echo "failed: ./decode.js --json 'foo[bar]=A&baz[0]=B&baz[1]=C'"
fi

str2=$(./encode.js -n '{"foo": {"bar": "A"}, "baz": ["B", "C"]}')
if [ $str2 != 'foo[bar]=A&baz[0]=B&baz[1]=C' ]; then
	>&2 echo "failed: ./encode.js -n '{\"foo\": {\"bar\": \"A\"}, \"baz\": [\"B\", \"C\"]}'"
fi

str3=$(./encode.js -d -n '{"foo": {"bar": "A"}, "baz": ["B", "C"]}')
if [ $str3 != 'foo.bar=A&baz[0]=B&baz[1]=C' ]; then
	>&2 echo "failed: ./encode.js -d -n '{\"foo\": {\"bar\": \"A\"}, \"baz\": [\"B\", \"C\"]}'"
fi

echo 'All tests passed.'
