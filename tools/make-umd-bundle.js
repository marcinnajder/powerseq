//https://github.com/ReactiveX/rxjs/blob/master/tools/make-umd-bundle.js
var rollup = require('rollup');
var fs = require('fs');
var path = require('path');

rollup.rollup({
  entry: './dist/esm/src/index.js'
}).then(function (bundle) {
  var result = bundle.generate({
    format: 'umd',
    moduleName: 'powerseq',
    sourceMap: true
  });

  fs.writeFileSync('./npmpackage/bundles/powerseq.es5.js', result.code);
  fs.writeFileSync('./npmpackage/bundles/powerseq.es5.map', result.map);
});