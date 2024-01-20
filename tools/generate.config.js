// generators are written in JS instead of TS because other TS source files are generated

global.it = global.describe = () => { }; // fake mocha methods

const glob = require("glob");
var path = require("path");


const hidden = new Set(["groupby1"]);
const creators = listMethods("./src/creators/*.ts");
const operators = listMethods("./src/operators/*.ts");
const allFunctions = operators.concat(creators);
const pOperators = ["concat", "defaultifempty", "includes", "sequenceequal", "zip", "interleave"];


function listMethods(globbingPattern) {
    return glob.sync(globbingPattern).map(p => path.basename(p, '.ts')).filter(o => !hidden.has(o)).sort();
}

// exports
exports.creators = creators;
exports.operators = operators;
exports.allFunctions = allFunctions;
exports.pOperators = pOperators;