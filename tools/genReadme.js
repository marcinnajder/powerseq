var glob = require("glob");
var fs = require("fs");
var path = require("path");
var util = require("util");
var os = require("os");

global.it = global.describe = () => { }; // fake mocha methods
var _maxColumns = 4;
var _maxRows = 6;
var enumerable = listMethods("./src/enumerable/*.ts");
var operators = listMethods("./src/operators/*.ts");
var githubAddressPrefix = "https://github.com/marcinnajder/powerseq/tree/master";

var otherLibs = {
    "linq": "[LINQ](https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx)",
    "jsarray": "[JS Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)",
    "lodash": "[lodash](https://lodash.com/docs/4.17.2)",
    "rxjs": "http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html",
    "ixjs": "...",
    "fsharp": "",
    "scala": "",
    "java": "",
}


var operatorsTable = generateTable(_maxColumns, _maxRows, operators, githubAddressPrefix, "operators");
var enumerableTable = generateTable(_maxColumns, _maxRows, enumerable, githubAddressPrefix, "enumerable");
var counterparts = ["linq", "jsarray", "lodash"];
var mappingTable = generateMappingTable(operators.concat(enumerable).sort(), githubAddressPrefix, counterparts);


var readmeContent =
    `
[operators](#operators) | [installation](#installation) | [key featues](#key-featues)

\`\`\`javascript
// chaining many operators
import {Enumerable} from "powerseq";

var q = Enumerable
    .range(1,Number.MAX_VALUE)
    .filter( x => x % 2 === 0)
    .take(5)
    .reverse();

console.log(q.toarray());

// execute single operator
import {map} from "powerseq";

for(var item of map([1,2,3,4,5], x => x % 2 === 0)){
    console.log(item);
}

// bundle only used operators (tree-shaking)
import {Enumerable} from "powerseq/enumerable";
import {range} from "powerseq/enumerable/range";
import {filter} from "powerseq/operators/filter";
import {toarray} from "powerseq/operators/toarray";

console.log(Enumerable.range(1,10).filter(x => x % 2 === 0).toarray());
\`\`\`

## operators
- don't miss tooltip over operator
- [click](${githubAddressPrefix}/docs/mapping.md) to see mapping powerseq operators to ${counterparts.map(n => otherLibs[n]).join(", ")}

enumerable
${enumerableTable}
operators
${operatorsTable}

## installation
## key featues
`
fs.writeFileSync("./README.md", readmeContent);
console.log("./README.md", " file generated");


var mappingContent =
    `
${mappingTable}
`
fs.writeFileSync("./docs/mapping.md", mappingContent);
console.log("./docs/mapping.md", " file generated");





function listMethods(globbingPattern) {
    return glob.sync(globbingPattern).map(p => path.basename(p, '.ts')).sort();
}

function findTableSize(columnCount, rowCount, methodCount) {
    while (columnCount * rowCount < methodCount) {
        rowCount++;
    }
    columnCount = Math.floor(methodCount / rowCount) + ((methodCount % rowCount) > 0 ? 1 : 0);
    if (columnCount === 1) {
        rowCount = methodCount;
    }
    return { rowCount, columnCount };
}

function generateTable(maxColumns, maxRows, methods, urlPrefix, enumerableOrOpertor) {
    var {rowCount, columnCount} = findTableSize(maxColumns, maxRows, methods.length);
    var methodName, unitTestModule, linq, samples;
    var content = "";

    for (var r = 0; r < rowCount; ++r) {
        content += "<tr>";
        for (var c = 0; c < columnCount; ++c) {
            methodName = methods[(rowCount * c) + r] || "";
            if (methodName === "") {
                break;
            }

            unitTestModule = require("../dist/test/" + enumerableOrOpertor + "/" + methodName + ".js");

            // linq = typeof unitTestModule.linq === "undefined" ? "" : "(" + unitTestModule.linq + ")";
            // content += `<td><span><a class="tooltip" href="${urlPrefix}/test/${enumerableOrOpertor}/${methodName}.ts" ${formatSamplesTooltip(methodName, unitTestModule.samples)}>${methodName}</a> ${linq}</span></td>`;
            content += `<td><span><a class="tooltip" href="${urlPrefix}/test/${enumerableOrOpertor}/${methodName}.ts" ${formatSamplesTooltip(methodName, unitTestModule.samples)}>${methodName}</a></span></td>`;
            //content += `<td><div class="wrapper"><a href="${urlPrefix}/test/${enumerableOrOpertor}/${methodName}.ts">${methodName}</a> <div class="tooltip">${formatSamplesTooltip(methodName, unitTestModule.samples)}</div> ${linq}</div></td>`;
        }
        content += "</tr>";
    }

    return `<table>${content}</table>`;
}




function generateMappingTable(methods, urlPrefix, counterparts) {
    var methodName, unitTestModule, unitTestModulePath;
    var content = "";

    // header
    content += "|" + ["powerseq"].concat(counterparts.map(n => otherLibs[n])).join("|") + "|" + os.EOL;
    content += "|" + ["powerseq"].concat(counterparts).map(_ => "---").join("|") + "|" + os.EOL;

    // content
    for (var methodName of methods) {
        var unitTestModulePath = ["/operators", "/enumerable"].map(f => path.resolve(__dirname, "../dist/test") + f + "/" + methodName + ".js").find(f => fs.existsSync(f));
        unitTestModule = require(unitTestModulePath);
        content += "|" + [methodName].concat(counterparts.map(c => unitTestModule[c] || "")).join("|") + "|" + os.EOL;
    }

    return content;
}

function formatSamplesTooltip(methodName, samples) {
    if (typeof samples === "undefined") {
        console.warn("no samples for operator: ", methodName);
        return "";
    }

    var samplesText = samples
        .map(sampleFunc => {
            var error;
            var sampleBody = sampleFunc.toString();
            sampleBody = sampleBody.substr(sampleBody.indexOf("=>") + 2);

            sampleBody = sampleBody.replace(/index_1\./g, "");
            sampleBody = sampleBody.replace(/\"/g, "'");

            var sampleResult;
            try {
                sampleResult = sampleFunc();

                // try to catch any exception thrown during the iteration
                if (sampleResult && sampleResult[Symbol.iterator]) {
                    Array.from(sampleResult);
                }

                // if(sampleBody.indexOf ("take") !== -1 && sampleBody.indexOf ("repeat") !== -1) {
                // }
            }
            catch (err) {
                error = err;
            }

            return `${sampleBody} -> ${formatResultValue(error || sampleResult)}`
        })
        .join("&#013;");
    //.join("</br>");

    return `title="${samplesText}"`;
}




function formatResultValue(value) {
    if (value instanceof Error) {
        return "error: " + value.message;
    }
    if (typeof value === "undefined") {
        return "undefined";
    }
    if (typeof value === "string") {
        return `'${value}'`;
    }
    if (Array.isArray(value)) {
        return "[" + Array.from(value).map(formatResultValue).join(", ") + "]";
    }
    if (value instanceof Map) {
        return `Map {${Array.from(value.entries()).map(([key, v]) => `${formatResultValue(key)} => ${formatResultValue(v)}`).join(", ")}}`;
    }
    if (value && value.constructor && (value.constructor.name === "Enumerable" || value.constructor.name === "OrderedEnumerable")) {
        return "enumerable [" + Array.from(value).map(formatResultValue).join(", ") + "]";
    }
    if (value[Symbol.iterator]) {
        return "seq [" + Array.from(value).map(formatResultValue).join(", ") + "]";
    }

    if (util.isObject(value)) {
        return `{ ${Object.keys(value).map(key => `${key}:${value[key]}`).join(", ")} }`;
    }
    return value;
}



// ** JS Array
// copyWithin
// fill
// ?? indexOf
// ?? join 
// keys
// ?? lastIndexOf
// pop
// push
// ?? reduceRight
// shift
// slice
// splice
// toLocalString
// toSource
// toString
// unshift
// values

// ** LINQ
// ToLookup
// AsEnumerable, AsQueryable


// ** lodash
// ?? compact (usuwa falsy)
// _.dropRight               -> skiplast !!! pasuje analogicznie do take...
// _.dropRightWhile
// _.fill
// _.findLastIndex
// _.flatten
// _.flattenDeep
// _.flattenDepth
// _.indexOf          -> juz zdaje sie drugi raz
// _.initial(array)         -> ale jak dopisze sie skiplast to bedzie to mozna do niego
// _.join 				-> moze dopisac cos takieg joinwithseparator ?? w tablicy takze jest_
// _.lastIndexOf       -> jak powstanie indexof to pewnie warto takze lastindexof
//   _.nth -> niby jest elementat ale nie potrafi liczby od konca, pytanie jak jest w F# i , w collection jest

// _.pull (modyfikuje istniejaca kolekcje)
// _.pullAll
// _.pullAllBy
// _.pullAllWith
// _.pullAt
// _.remove
// _.slice
// _.sortedIndex (wylicza indeks do wstawienia)
// _.sortedIndexBy
// _.sortedIndexOf
// _.sortedLastIndex
// _.sortedLastIndexBy
// _.sortedLastIndexOf
// _.sortedUniq (dziala jak unique, ale zoptymalizowane pod posortowane kolekcje)
// _.sortedUniqBy
// _.takeRightWhile
// _.unzip
// _.unzipWith
// _.xorBy
// _.xorWith
// _.zipObject
// _.zipObjectDeep
// ^^collection^^
// _.countBy
// _.eachRight -> forEachRight
// _.findLast
// _.flatMapDeep
// _.flatMapDepth
// _.invokeMap
// _.partition
// _.reduceRight
// _.reject
// _.sample
// _.sampleSize
// _.shuffle





// <style>
//     .wrapper {
//       color: #555;
//       position: relative;
//     }

//     .wrapper .tooltip {
//       width: 300px;
//       z-index: 1;
//       background: lightgray;
//       color: black;
//       white-space: pre-line;
//       /* widać białe znaki */
//       top: 100%;
//       display: block;
//       margin-top: 10px;
//       opacity: 0;
//       padding: 10px;
//       pointer-events: none;
//       position: absolute;
//       transition: all 0.2s ease;
//     }

//     /*This bridges the gap so you can mouse into the tooltip without it disappearing */
//     /*
//     .wrapper .tooltip:before {
//       top: -10px;
//       content: " ";
//       display: block;
//       height: 10px;
//       left: 0;
//       position: absolute;
//       width: 100%;
//     }
//     */

//     .wrapper .tooltip:after {
//       /*strzałka*/
//       border-left: solid transparent 7px;
//       border-right: solid transparent 7px;
//       border-bottom: solid lightgray 7px;
//       top: -7px;
//       margin-left: -7px;
//       content: " ";
//       height: 0;
//       left: 14px;
//       position: absolute;
//       width: 0;
//     }

//     .wrapper:hover .tooltip {
//       opacity: 1;
//       pointer-events: auto;
//     }
//   </style>




//https://github.com/ReactiveX/IxJS/tree/master/iterable
//https://github.com/Reactive-Extensions/IxJS/wiki/Enumerable


// Filtering
// - Where (filter)
// - OfType (oftype)

// Projection
// - Select  (map)
// - SelectMany (flatmap)

// Partitioning
// - Skip (skip)
// - SkipWhile (skipwhile)
// - Take (take)
// - TakeWhile (takewhile)

// Join 
// - GroupJoin (groupjoin)
// - Join (join)
// - Zip (zip)

// Concatenation 
// - Concat (concat)

// Ordering
// - OrderBy, OrderByDescending (sort)
// - Reverse (reverse)
// - ThenBy, ThenByDescending (sort)

// Grouping
// - GroupBy (groupby)
// - ToLookup

// Set
// - Distinct (distinct)
// - Except (except)
// - Intersect (intersect)
// - Union (union) 

// Conversion
// - AsEnumerable, AsQueryable
// - Cast (cast)
// - ToArray,ToList (toarray)
// - ToDictionary (tomap)

// Equality
// - SequenceEqual (sequenceequal)

// Element 
// - ElementAt, ElementAtOrDefault (elementat)
// - First, FirstOrDefault (find)
// - Last, LastOrDefault (last)
// - Single, SingleOrDefault (single)

// Generation
// - DefaultIfEmpty (defaultifempty)
// - Empty (empty)
// - Range (range)
// - Repeat (repeatvalue)

// Quantifiers
// - All (every)
// - Any (some)
// - Contains (includes)

// Aggregation
// - Aggregate (reduce)
// - Count, LongCount (count)
// - Max (max)
// - Min (min)
// - Sum (sum)
// - Average (average)

// Others
// - of
// - entries 
// - toobject
// - findIndex





// <style>
//  [data-tooltip] {
//       cursor: default;
//       font: normal 1em sans-serif;
//   }

//   [data-tooltip]:hover:after {
//       display: block;
//       content: attr(data-tooltip);
//       white-space: pre-wrap;
//       color: #f00;
//   }
// </style>


// <span data-tooltip="Sentence one here. Sentence&#xa;two here. Sentence three here.">See my CSS tooltip with HTML-entity &amp;#xa; line break:</span>