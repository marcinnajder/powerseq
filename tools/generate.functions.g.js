var glob = require("glob");
var fs = require("fs");
var path = require("path");
var os = require("os");

const { creators, operators, pOperators } = require("./generate.config");

var creatorsImports = creators.map(f => `export { ${f} } from "./creators/${f}";`).join(os.EOL);
var operatorsImports = operators.map(f => `export { ${f} } from "./operators/${f}";`).join(os.EOL);
var oOperatorsImports = pOperators.map(f => `export { ${f}p } from "./operators/${f}";`).join(os.EOL);


saveFile("./src/functions.g.ts", `// creators
${creatorsImports}
// operators
${operatorsImports}
// p-operators
${oOperatorsImports}
`);

function saveFile(filePath, fileContent) {
    fileContent = "// file has been generated automatically" + os.EOL + fileContent;
    fs.writeFileSync(filePath, fileContent);
    console.log(filePath, " file has been generated");
}


