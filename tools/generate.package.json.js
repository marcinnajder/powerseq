//https://github.com/ReactiveX/rxjs/blob/master/.make-packages.js

var fs = require('fs');
var pkg = require('../package.json');

// var cjsPkg = Object.assign({}, pkg, {
//   name: 'rxjs',
//   main: 'Rx.js',
//   typings: 'Rx.d.ts'
// });


// angular2 way of distributing npm packages (ES6 modules + ES5 code + ES5 webpack bundles)
// "main": "bundles/core.umd.js",
// "name": "@angular/core",
// "typings": "index.d.ts",
// "module": "index.js",

// RxJS way of distributing npm packages (ES6 modules + ES5 code + ES5 webpack bundles, but "main" is not specified so webpack doesn't use bundles )
// "name": "rxjs",
// "main": "Rx.js",
// "typings": "Rx.d.ts",


// https://nodejs.org/en/about/previous-releases
// 8.17.0 - 2019-12-17
// v16.20.2 - 2023-08-08
// pkg.engines: {
//     node: ">=8.17.0"
// };


pkg.main = "index.js"; // for node.js
// pkg.module = "esm_es5/index.js"; // for tools like webpack2, rollup

delete pkg.scripts;

var filePath = "./npmpackage/package.json";
fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2));
console.log(filePath, " file generated");

fs.writeFileSync('./npmpackage/LICENSE.txt', fs.readFileSync('./LICENSE.txt').toString());
fs.writeFileSync('./npmpackage/README.md', fs.readFileSync('./README.md').toString());
