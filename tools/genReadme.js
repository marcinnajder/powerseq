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
    "rxjs": "[RxJS](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)",
    "fsharp": "[F#](https://msdn.microsoft.com/en-us/visualfsharpdocs/conceptual/collections.seq-module-%5bfsharp%5d)",
    "ixjs/ix.net": "?",
    "scala": "",
    "java": "",
}

var operatorsTable = generateTable(_maxColumns, _maxRows, operators, githubAddressPrefix, "operators");
var enumerableTable = generateTable(_maxColumns, _maxRows, enumerable, githubAddressPrefix, "enumerable");
var counterparts = ["linq", "rxjs", "jsarray", "lodash", "fsharp"];
var mappingTable = generateMappingTable(operators.concat(enumerable).sort(), githubAddressPrefix, counterparts);


var readmeContent =
    `
## installation and usage

\`\`\`
npm install powerseq
\`\`\`

executing single operator

\`\`\`javascript 
import { filter } from "powerseq";

for(var item of filter([1,2,3,4,5], x => x % 2 === 0)){
    console.log(item);
}
\`\`\`

chaining many operators 

\`\`\`javascript
import { Enumerable } from "powerseq/enumerable";  
// use 'Enumerable' class ONLY on the server side !! (use 'pipe' method on the client side )

const items = Enumerable
    .range(1,Number.MAX_VALUE)
    .filter( x => x % 2 === 0)
    .take(5)
    .reverse()
    .toarray();

console.log(items);
\`\`\`

chaining many operators using **pipe** method (it allows code tree shaking)

\`\`\`javascript
import { pipe, range, filter, take, reverse, toarray } from "powerseq";

const items = pipe(
    range(1, Number.MAX_VALUE),
    filter(x => x % 2 === 0),
    take(5),
    reverse(),
    toarray());

console.log(items);
\`\`\`

most of the operators can be used as a single operator (\`filter([1,2,3,4,5], x => x % 2 === 0)\`) or as a part of the operator chain \`pipe([1, 2, 3, 4, 5], filter(x => x % 2 === 0), ... )\`.But some operators have special counterparts (concatp, defaultifemptyp, includesp, sequenceequalp, zipp) when used with pipe, so we call \`concat([1,2,3], [4,5,6])\` but we have to call \`pipe([1,2,3], concatp([4,5,6]), ... )\` if we want to chain \`concat\` with other operators.

## operators
- each operator below has **tooltip with documentation**
- [click](${githubAddressPrefix}/docs/mapping.md) to see mapping powerseq operators to ${counterparts.map(n => otherLibs[n]).join(", ")}

enumerable
${enumerableTable}
operators
${operatorsTable}
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
    var { rowCount, columnCount } = findTableSize(maxColumns, maxRows, methods.length);
    var methodName, unitTestModule, linq, samples;
    var content = "";

    for (var r = 0; r < rowCount; ++r) {
        content += "<tr>";
        for (var c = 0; c < columnCount; ++c) {
            methodName = methods[(rowCount * c) + r] || "";
            if (methodName === "") {
                break;
            }

            unitTestModule = require("../dist/cjs_es6/test/" + enumerableOrOpertor + "/" + methodName + ".js");

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
        var unitTestModulePath = ["/operators", "/enumerable"].map(f => path.resolve(__dirname, "../dist/cjs_es6/test") + f + "/" + methodName + ".js").find(f => fs.existsSync(f));
        unitTestModule = require(unitTestModulePath);

        var maxMatchingOperators = counterparts.map(c => unitTestModule[c]).filter(ops => Array.isArray(ops)).reduce((p, c) => Math.max(p, c.length), 0);
        content += "|" + [methodName].concat(counterparts.map(c => unitTestModule[c])).map(o => formatOperators(o, maxMatchingOperators)).join("|") + "|" + os.EOL;
        //content += "|" + [methodName].concat(counterparts.map(c => (unitTestModule[c] || "").toString().replace(/\,/g, "</br>"))).join("|") + "|" + os.EOL;
    }

    return content;
}


function formatOperators(items, maxMatchingOperators) {
    if (typeof items === undefined) {
        return "";
    }

    var items = fillWithEmptyStringsUpToXItems(items, maxMatchingOperators);
    return items.toString().replace(/\,/g, "</br>");


    function fillWithEmptyStringsUpToXItems(items, x) {
        if (!Array.isArray(items)) {
            items = [items];
        }
        if (items.length === x) {
            return items;
        }
        for (var i = items.length; i < x + 1; i++) { // x + 1 
            items.push("");
        }
        return items;
    }
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
// _.dropRightWhile
// _.fill
// _.findLastIndex
// _.flatten
// _.flattenDeep
// _.flattenDepth
// _.indexOf          -> juz zdaje sie drugi raz
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
// _.flatMapDeep
// _.flatMapDepth
// _.invokeMap
// _.partition
// _.reduceRight
// _.reject
// _.sample
// _.sampleSize
// _.shuffle




// ** Rx JS
// - catch(selector: function): Observable
// Catches errors on the observable to be handled by returning a new observable or throwing an error.
// - partition -> to mial lodash i 
// - share -> to takze jest w Ix.net
// - retry -> jesli moze znajdzie sie jakis fajny case rzeczywistego uzycia? (generalnie inne takze do wyjatkow moze byc fajne jesli sie znajdzie przypadek)




// -----> F#
// - cache -> taki memoize zdaje sie, ale niby poki idziem po nim to keszuje, ale jak dojdziemy do konca to czysci
// - choose
// - compareWith - ciekawa metoda ktora dziala jak comparator (zwraca -1,0,1) ale dziala dla calej kolekcji, moze warto zaimplementowac :) choc tutaj zadna metoda powerseq nie przujmuje comparatora ale moze dla keySelectora warto zaimplementowac
// - concat -> tutaj 2 F# to jakby flatten czyli z [[T],[T]] robi [T,T], to samo mozna osiagnac flatmap
// - countBy -> czyli zliczania tworzac grupy, takie cos mial takze lodash, tutaj mozna groupby i count zrobic
// - exists2 -> to mozna zaimplementowac robiax zip(...).some(...)
// - forall2 -> anlogicznie do tego wyzej zip(...).every(...)
// - init -> mozna zrobic range(1,5).map(x=>...) lub lepiej za pomoca generate
// - initInfinite -> to takze mozna za pomoca generate
// - iter2 -> zip(...).foreach(...)
// - map2 -> to jak zip
// - ofArray - to jest konwersja z tablicy do sekwencji, tutaj niepotrzebne bo mamy Enumerable.from
// - ofList -> to samo co wyzej
// - pick -> odpowiednil choose, tak jak find jest odpowiednikiem filter, gdybym pisal choose to pewnie warto takze pick
// - readonly -> chodzi o to aby opakowac jakas istniejaca sekwencje gdy jest to np tablica aby nie miec dostepu do oryginalnego obiektu
// - tryPick
// - unfold -> ciekawa w sumie odwrotnosc fold, byc moze warto zaimplementowac (tyle ze tutaj metoda nazywa sie reduce)









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