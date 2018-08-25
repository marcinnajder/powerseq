const glob = require("glob");
const minimatch = require("minimatch")
const fs = require("fs");
const path = require("path");
const os = require("os");



const repl = {
    "Enumerable": "AsyncEnumerable",
    "Iterable": "AsyncIterable",
    "Iterator": "AsyncIterator",
    ".iterator": ".asyncIterator",
    "function\\*": "async function*",
    "for \\(": "for await("
}

const files = [
    "./enumerable.ts",
    "./common/wrap.ts",
    "./common/types.ts",
    "./operators/map.ts",
    "./operators/filter.ts",
];

for (const filePath of files) {
    var fileContent = fs.readFileSync(path.join("./src/", filePath), "utf-8");
    for (const [key, value] of keyValues(repl)) {
        fileContent = fileContent.replace(new RegExp(key, "g"), value);
    }

    fileContent = "// file was generated" + os.EOL + fileContent;
    fs.writeFileSync(path.join("./src/async", filePath), fileContent);
    console.log(`file ${filePath} generated`);
}


function* keyValues(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}
// const replacePrefix = "/**replace";
// const relacements = ["Async", "await", "async"];
// const relacementsObj = relacements.reduce((a, p) => (a[`/**${p}**/`] = p, a), {});
// const allFilePaths = glob.sync("./src/**/*.ts").filter(p => !minimatch(p, "./src/async/**"));


// (Symbol as any).asyncIterator = Symbol.asyncIterator || Symbol("Symbol.asyncIterator");

// export class /**Async**/Enumerable<T> implements /**Async**/Iterable<T>{
//     constructor(public _iterable:/**Async**/Iterable<T>) {
//     }
//     [Symbol./**! iterator asyncIterator**/iterator] = function () {
//         return this._iterable[Symbol./**! iterator asyncIterator**/iterator]();
//     };
// }



// for (let filePath of allFilePaths) {
//     let fileContent = fs.readFileSync(filePath, "utf-8");
//     if (hasSpecialChars(fileContent)) {
//         for (var key of Object.keys(relacementsObj)) {
//             let value = relacementsObj[key];
//             fileContent = fileContent.replace(new RegExp(key, "g"), value);
//         }

//         console.log("-> ", filePath);
//         console.log(fileContent);
//     }
// }

// function hasSpecialChars(fileContent) {
//     return relacements.some(r => fileContent.indexOf(r) !== -1) || fileContent.indexOf(replacePrefix) !== -1;
// }

//console.log(allFiles);


// var enumerable = glob.sync("./src/enumerable/*.ts");


// var src = operators
//     .concat(enumerable)
//     .map(p => p.replace("src"+path.sep,"").replace(".ts",""))
//     .map(p =>`export * from "${p}";`)
//     .join(os.EOL);

// //console.log(src);
// var filePath = "./src/methods.generated.ts";
// fs.writeFileSync(filePath, src);
// console.log(filePath," file generated");