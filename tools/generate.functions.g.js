var glob = require("glob");
var fs = require("fs");
var path = require("path");
var os = require("os");

var operators = glob.sync("./src/operators/*.ts");
var creators = glob.sync("./src/creators/*.ts");

var files = operators.concat(creators).map(p => p.replace("src" + path.sep, "").replace(".ts", ""));
var indexContent = files.map(p => `export { ${p.split("/")[1]} } from "./${p}";`).join(os.EOL);

saveFile("./src/functions.g.ts",
    `
${indexContent}`);

function saveFile(filePath, fileContent) {
    fileContent = "// file has been generated automatically" + os.EOL + fileContent;
    fs.writeFileSync(filePath, fileContent);
    console.log(filePath, " file has been generated");
}


