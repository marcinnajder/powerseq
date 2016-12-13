//https://github.com/ReactiveX/rxjs/blob/master/tools/make-umd-bundle.js
var rollup = require('rollup');
var fs = require('fs');
var path = require('path');

rollup.rollup({
  entry: './dist/es6/src/index.js'
}).then(function (bundle) {
  var result = bundle.generate({
    format: 'umd',
    moduleName: 'powerseq',
    sourceMap: true
  });
  var tslib = fs.readFileSync('./node_modules/tslib/tslib.js', 'utf8');

  fs.writeFileSync('./dist/es6/powerseq.es6.js', tslib + result.code);
  fs.writeFileSync('./dist/es6/powerseq.es6.map', result.map);
});