var glob = require("glob");
var fs = require("fs");
var path = require("path");
var os = require("os");

global.it = global.describe = () => {}; // fake mocha methods
var _maxColumns = 4;
var _maxRows = 6;
var enumerable = listMethods("./src/enumerable/*.ts");
var operators = listMethods("./src/operators/*.ts");
var githubAddressPrefix = "https://github.com/marcinnajder/powerseq/tree/master/test";

var operatorsTable = generateTable(_maxColumns, _maxRows, operators, githubAddressPrefix, "operators");
var enumerableTable = generateTable(_maxColumns, _maxRows, enumerable, githubAddressPrefix, "enumerable");


var readmeContent =
`

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

fs.writeFileSync("./README.md",readmeContent);
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
    var methodName, linq;
    var content = "";

    for (var r = 0; r < rowCount; ++r) {
        content += "<tr>";
        for (var c = 0; c < columnCount; ++c) {
            methodName = methods[(rowCount * c) + r] || "";
            if(methodName===""){
                break;
            }
            linq = require("../dist/test/"+enumerableOrOpertor+"/"+methodName+".js").linq;
            content += `<td><a href="${urlPrefix}/${enumerableOrOpertor}/${methodName}.ts">${methodName}${linq?" ("+linq+")":""}</a></td>`;
        }
        content += "</tr>";
    }

    return `<table>${content}</table>`;
}



// Filtering
// - Where (filter)
// - OfType

// Projection
// - Select  (map)
// - SelectMany (flatmap)

// Partitioning
// - Skip (skip)
// - SkipWhile (skipwhile)
// - Take (take)
// - TakeWhile (takewhile)

// Join 
// - GroupJoin
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
// - Cast
// - ToArray,ToList (toarray)
// - ToDictionary (tomap)

// Equality
// - SequenceEqual

// Element 
// - ElementAt, ElementAtOrDefault (elementat)
// - First, FirstOrDefault (find)
// - Last, LastOrDefault (last)
// - Single, SingleOrDefault (single)

// Generation
// - DefaultIfEmpty
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


