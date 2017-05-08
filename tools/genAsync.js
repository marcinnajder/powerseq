const glob = require("glob");
const minimatch = require("minimatch")
const fs = require("fs");
const path = require("path");
const os = require("os");

const replacePrefix = "/**replace";
const relacements = [ "Async", "await", "async"];
const relacementsObj = relacements.reduce( (a,p) => (a[`/**${p}**/`] = p,a), {});
const allFilePaths = glob.sync("./src/**/*.ts").filter(p => !minimatch(p, "./src/async/**"));


for(let filePath of allFilePaths){
    let fileContent = fs.readFileSync(filePath, "utf-8");
    if(hasSpecialChars(fileContent)){
        for(var key of Object.keys(relacementsObj)){
            let value = relacementsObj[key];
            fileContent = fileContent.replace(new RegExp(key, "g"), value);
        }

        console.log("-> ", filePath);
        console.log(fileContent);
    }
}

function hasSpecialChars(fileContent){
    return relacements.some( r => fileContent.indexOf(r) !== -1) || fileContent.indexOf(replacePrefix) !== -1;
}

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
