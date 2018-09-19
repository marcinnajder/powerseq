var glob = require("glob");
var fs = require("fs");
var path = require("path");
var os = require("os");

var operators = glob.sync("./src/operators/*.ts");
var enumerable = glob.sync("./src/enumerable/*.ts");
var files = operators
    .concat(enumerable)
    .map(p => p.replace("src" + path.sep, "").replace(".ts", ""));

var indexContent = files
    .map(p => `export { ${p.split("/")[2]} } from "${p}";`)
    .join(os.EOL);
saveFile("./src/index.ts",
    `export { pipe } from "./pipe";
export { concatp } from "./operators/concat";
export { defaultifemptyp } from "./operators/defaultifempty";
export { includesp } from "./operators/includes";
export { sequenceequalp } from "./operators/sequenceequal";
export { zipp } from "./operators/zip";

export { IterableGroup, EnumerableGroup, KeySelectorFunc, ElementSelectorFunc, ResultSelectorFunc} from "./operators/groupby";

${indexContent}`);

// var imports = files
//     .map(p => `import "${p}"; `)
//     .join(os.EOL);

saveFile("./src/enumerable.ts",
    `export * from "./enumerable_";
export * from "./orderedEnumerable";        
export * from "./index";
`);


function saveFile(filePath, fileContent) {
    fileContent = "// file has been generated automatically" + os.EOL + fileContent;
    fs.writeFileSync(filePath, fileContent);
    console.log(filePath, " file has been generated");
}


