var glob = require("glob");
var fs = require("fs");
var path = require("path");
var os = require("os");

var operators = glob.sync("./src/operators/*.ts");
var enumerable = glob.sync("./src/enumerable/*.ts");


var src = operators
    .concat(enumerable)
    .map(p => p.replace("src"+path.sep,"").replace(".ts",""))
    .map(p =>`export * from "${p}";`)
    .join(os.EOL);

//console.log(src);
var filePath = "./src/methods.generated.ts";
fs.writeFileSync(filePath, src);
console.log(filePath," file generated");
