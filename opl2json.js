'use strict';

const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const join = require('path').join;

const inputFile = argv._[0];
const outFile = inputFile.replace('.opl', '.json');

const txt = fs.readFileSync(join(__dirname, inputFile), 'utf-8');

const lines = txt.split('\n');

const obj = lines.reduce((memo, val) => {
  if (!val) return memo;
  const cols = val.split(' ');
  const id = cols[0];
  let tags = cols[7];
  tags = tags.slice(1, tags.length);
  const tagGroups = tags.split(',');
  const tagObj = tagGroups.reduce((tagMemo, tagVal) => {
    const split = tagVal.split('=');
    const key = split[0];
    const val = split[1];
    tagMemo[key] = val;
    return tagMemo; 
  }, {});
  memo[id] = tagObj;
  return memo;
}, {});

fs.writeFileSync(outFile, JSON.stringify(obj, null, 2));
