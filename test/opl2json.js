const tape = require('tape');
const opl2json = require('../opl2json');
const fs = require('fs');
const join = require('path').join;

tape('Test fixture', (assert) => {
    var oplTxt = fs.readFileSync(join(__dirname, 'fixtures/turnlanes.opl'), 'utf-8');
    var jsonData = opl2json(oplTxt);
    var jsonTxt = fs.readFileSync(join(__dirname, 'fixtures/turnlanes.json'), 'utf-8');
    assert.equal(JSON.stringify(jsonData, null, 2), jsonTxt, 'json output is as expected');
    assert.end();
});