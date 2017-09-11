'use strict';

const fs = require('fs');

if (require.main === module) {
  const argv = require('minimist')(process.argv.slice(2));
  const inputFile = argv._[0];
  const outFile = inputFile.replace('.opl', '.json');
  const txt = fs.readFileSync(inputFile, 'utf-8');
  const jsonData = opl2json(txt);
  fs.writeFileSync(outFile, JSON.stringify(jsonData, null, 2));
}

module.exports = opl2json;

/*
  Function to convert a string in `opl` format and return a JSON object

  @param oplTxt {String} opl, as string
  @returns {Object} converted to JSON object
*/
function opl2json(oplTxt) {
  const lines = oplTxt.split('\n');
  const obj = lines.reduce((memo, val) => {
    if (!val) return memo;
    const cols = val.split(' ');
    const id = cols[0];
    let tags = cols[7];
    tags = tags.slice(1, tags.length);
    const tagGroups = tags.split(',');
    let tagObj = tagGroups.reduce((tagMemo, tagVal) => {
      const split = tagVal.split('=');
      const key = split[0];
      const val = split[1];
      tagMemo[key] = val;
      return tagMemo;
    }, {});
    if (cols.length > 8 && cols[8][0] === 'M') {
      let members = cols[8];
      members = members.slice(1, members.length);
      const membersSplit = members.split(',');
      membersSplit.forEach((member) => {
        const memberSplit = member.split('@');
        tagObj[memberSplit[1]] = memberSplit[0];
      });

    }
    memo[id] = tagObj;
    return memo;
  }, {});
  return obj;
}




