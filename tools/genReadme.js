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
var githubAddressPrefix = "https://github.com/marcinnajder/powerseq/tree/master/test";


console.log()
var operatorsTable = generateTable(_maxColumns, _maxRows, operators, githubAddressPrefix, "operators");
var enumerableTable = generateTable(_maxColumns, _maxRows, enumerable, githubAddressPrefix, "enumerable");


var readmeContent =
    `
<style>
    .wrapper {
      color: #555;
      position: relative;
    }

    .wrapper .tooltip {
      width: 300px;
      z-index: 1;
      background: lightgray;
      color: black;
      white-space: pre-line;
      /* widać białe znaki */
      top: 100%;
      display: block;
      margin-top: 10px;
      opacity: 0;
      padding: 10px;
      pointer-events: none;
      position: absolute;
      transition: all 0.2s ease;
    }

    /*This bridges the gap so you can mouse into the tooltip without it disappearing */
    /*
    .wrapper .tooltip:before {
      top: -10px;
      content: " ";
      display: block;
      height: 10px;
      left: 0;
      position: absolute;
      width: 100%;
    }
    */
    
    .wrapper .tooltip:after {
      /*strzałka*/
      border-left: solid transparent 7px;
      border-right: solid transparent 7px;
      border-bottom: solid lightgray 7px;
      top: -7px;
      margin-left: -7px;
      content: " ";
      height: 0;
      left: 14px;
      position: absolute;
      width: 0;
    }
    
    .wrapper:hover .tooltip {
      opacity: 1;
      pointer-events: auto;
    }
  </style>

    
\`\`\`javascript
import {Enumerable} from "powerseq";

var q = Enumerable
    .range(1,Number.MAX_VALUE)
    .filter( x => x % 2 === 0)
    .take(5)
    .reverse();

console.log(q.toarray());
\`\`\`

enumerable
${enumerableTable}

operators
${operatorsTable}
`

fs.writeFileSync("./README.md", readmeContent);
console.log("./README.md", " file generated");



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
            linq = typeof unitTestModule.linq === "undefined" ? "" : "(" + unitTestModule.linq + ")";
            //content += `<td><span><a class="tooltip" href="${urlPrefix}/${enumerableOrOpertor}/${methodName}.ts" ${formatSamplesTooltip(methodName, unitTestModule.samples)}>${methodName}</a> ${linq}</span></td>`;

            content += `<td><div class="wrapper"><a href="${urlPrefix}/${enumerableOrOpertor}/${methodName}.ts">${methodName}</a> <div class="tooltip">${formatSamplesTooltip(methodName, unitTestModule.samples)}</div> ${linq}</div></td>`;
        }
        content += "</tr>";
    }

    return `<table>${content}</table>`;
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

                // if(sampleBody.indexOf ("defaultifempty") !== -1) {
                // }
            }
            catch (err) {
                error = err;
            }

            return `${sampleBody} -> ${formatResultValue(error || sampleResult)}`
        })
        .join("&#013;");
        //.join("</br>");

    return `${samplesText}`;
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
// - ThenBy, ThenByDescending

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