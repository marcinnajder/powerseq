const glob = require("glob");
const fs = require("fs");
const path = require("path");
const util = require("util");
const os = require("os");
const { creators, operators, allFunctions, pOperators } = require("./generate.config");


const _maxColumns = 4;
const _maxRows = 6;

const allFunctionsImportPrefix = allFunctions.concat(["pipe"]).map(functionName => [`(0, index_1.${functionName})`, functionName]);
const githubAddressPrefix = "https://github.com/marcinnajder/powerseq/tree/master";

const otherLibs = {
    "linq": "[LINQ](https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx)",
    "jsarray": "[JS Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)",
    "lodash": "[lodash](https://lodash.com/docs/4.17.2)",
    "rxjs": "[RxJS](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)",
    "fsharp": "[F#](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html)",
    "clojure": "[Clojure](https://clojure.org/api/cheatsheet)",
    "kotlin": "[Kotlin](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/-sequence/)",
    "java": "[Java](https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/util/stream/Stream.html)",
    "ixjs/ix.net": "?",
    "scala": ""
}


const operatorsTable = generateTable(_maxColumns, _maxRows, operators, githubAddressPrefix, "operators");
const enumerableTable = generateTable(_maxColumns, _maxRows, creators, githubAddressPrefix, "creators");
const counterparts = ["linq", "rxjs", "jsarray", "lodash", "fsharp", "clojure", "kotlin", "java"];
const mappingTable = generateMappingTable([...allFunctions].sort(), githubAddressPrefix, counterparts);
const mappingLines = generateMappingLines([...allFunctions].sort(), githubAddressPrefix, counterparts);

const creatorsDocs = generateDocs(creators, githubAddressPrefix, "creators");
const operatorsDocs = generateDocs(operators, githubAddressPrefix, "operators");

// console.log(creatorsDocs);
// console.log(operatorsDocs);
// creators
// ${enumerableTable}
// operators
// ${operatorsTable}


var readmeContent =
    `## Documentation

\`\`\`typescript
import { pipe, range, filter, take, toarray } from "powerseq"; // npm install powerseq

// calling one operator
for(var item of filter([1,2,3,4,5], x => x % 2 === 0)){
    console.log(item);
}

// chaining many operators 
const items = pipe(range(1, Number.MAX_VALUE), filter(x => x % 2 === 0), take(5), toarray());
console.log(items);
\`\`\`

- thanks to function overloading the same operator can be called alone or as a part of \`pipe(..., operator(), ...)\` expression
- for some operators a special counterparts ending with \`p\` are provided (${pOperators.map(o => `\`${o}p\``)}), those functions must be used inside \`pipe(..., opp())\`, so we call \`concat([1,2,3], [4,5,6])\` or \`pipe([1,2,3], concatp([4,5,6]) )\`  
- [mapping](#mapping) powerseq operators to ${counterparts.map(n => otherLibs[n]).join(", ")}

### functions

- creators: ${creators.map(f => `[${f}](#${f})`).join(", ")}
- operators: ${operators.map(f => `[${f}](#${f})`).join(", ")}

### creators

${creatorsDocs}

### operators

${operatorsDocs}

### mapping

${mappingLines}

`
fs.writeFileSync("./README.md", readmeContent);
console.log("./README.md", " file generated");


var mappingContent =
    `
${mappingTable}
`
fs.writeFileSync("./docs/mapping.md", mappingContent);
console.log("./docs/mapping.md", " file generated");



// function listMethods(globbingPattern) {
//     return glob.sync(globbingPattern).map(p => path.basename(p, '.ts')).sort();
// }

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

function generateTable(maxColumns, maxRows, methods, urlPrefix, creatorsOrOpertors) {
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

            unitTestModule = require("../dist/test/" + creatorsOrOpertors + "/" + methodName + ".js");

            // linq = typeof unitTestModule.linq === "undefined" ? "" : "(" + unitTestModule.linq + ")";
            // content += `<td><span><a class="tooltip" href="${urlPrefix}/test/${enumerableOrOpertor}/${methodName}.ts" ${formatSamplesTooltip(methodName, unitTestModule.samples)}>${methodName}</a> ${linq}</span></td>`;
            content += `<td><span><a href="${urlPrefix}/src/${creatorsOrOpertors}/${methodName}.ts">${methodName}</a></span></td>`;
            //content += `<td><div class="wrapper"><a href="${urlPrefix}/test/${enumerableOrOpertor}/${methodName}.ts">${methodName}</a> <div class="tooltip">${formatSamplesTooltip(methodName, unitTestModule.samples)}</div> ${linq}</div></td>`;
        }
        content += "</tr>";
    }

    return `<table>${content}</table>`;
}


function generateDocs(methods, urlPrefix, creatorsOrOpertors) {
    //return ` \`\`\`${sampleBody}\`\`\` -> \`\`\`${formatResultValue(error || sampleResult)}\`\`\` `
    const ticks = `\`\`\``;

    var content = "";

    for (const methodName of methods) {
        const unitTestModule = require("../dist/test/" + creatorsOrOpertors + "/" + methodName + ".js");
        const samples = formatSamplesList(methodName, unitTestModule.samples);

        // const lines = samples.map(([code, result]) => `  - ${ticks}${code}${ticks}${os.EOL}       - ${ticks}${result}${ticks}`)
        const lines = samples.map(([code, result]) => `- ${ticks}${code}${ticks}${(code.length > 70 ? os.EOL + "        - " : " -> ")}${ticks}${result}${ticks}`)

        content += `##### ${methodName} [up](#functions)
${lines.join(os.EOL)}
`;
    }

    return content;
}





function generateMappingTable(methods, urlPrefix, counterparts) {
    // console.log(methods);

    var methodName, unitTestModule, unitTestModulePath;
    var content = "";

    // header
    content += "|" + ["powerseq"].concat(counterparts.map(n => otherLibs[n])).concat(["powerseq"]).join("|") + "|" + os.EOL;
    content += "|" + ["powerseq"].concat(counterparts).concat(["powerseq"]).map(_ => "---").join("|") + "|" + os.EOL;

    // content
    for (var methodName of methods) {
        var unitTestModulePath = ["/operators", "/creators"].map(f => path.resolve(__dirname, "../dist/test") + f + "/" + methodName + ".js").find(f => fs.existsSync(f));
        unitTestModule = require(unitTestModulePath);


        var maxMatchingOperators = counterparts.map(c => unitTestModule[c]).filter(ops => Array.isArray(ops)).reduce((p, c) => Math.max(p, c.length), 0);
        content += "|" + [methodName].concat(counterparts.map(c => unitTestModule[c])).map(o => formatOperators(o, maxMatchingOperators)).concat([methodName]).join("|") + "|" + os.EOL;
        //content += "|" + [methodName].concat(counterparts.map(c => (unitTestModule[c] || "").toString().replace(/\,/g, "</br>"))).join("|") + "|" + os.EOL;
    }

    return content;
}

function generateMappingLines(methods, urlPrefix, counterparts) {
    let content = "";

    for (const methodName of methods) {
        const unitTestModulePath = ["/operators", "/creators"].map(f => path.resolve(__dirname, "../dist/test") + f + "/" + methodName + ".js").find(f => fs.existsSync(f));
        const unitTestModule = require(unitTestModulePath);

        const funcsByLang = counterparts
            .map(lang => ({ lang, funcs: unitTestModule[lang] }))
            .filter(({ funcs }) => funcs)
            .map(({ lang, funcs }) => ({ lang, funcs: Array.isArray(funcs) ? funcs : [funcs] }));

        content += `- **${methodName}** - ${funcsByLang.map(({ lang, funcs }) => `${funcs.join(", ")} (${lang})`).join(", ")}${os.EOL}`
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
            return [items];
        }
        if (items.length === x) {
            return items;
        }

        const itemsCopy = [...items]; // do not mutate array object exported from UT file
        for (var i = items.length; i < x + 1; i++) { // x + 1 
            itemsCopy.push("");
        }
        return itemsCopy;
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

            sampleBody = sampleBody.replace(/enumerable_1\./g, "");
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

            return `${sampleBody} -> ${formatResultValue(error || sampleResult)} `
        })
        .join("&#013;");
    //.join("</br>");

    return `title = "${samplesText}"`;
}

function formatSamplesList(methodName, samples) {
    if (typeof samples === "undefined") {
        console.warn("no samples for operator: ", methodName);
        return "";
    }

    return samples.map(sampleFunc => {
        var error;
        var sampleBody = sampleFunc.toString();
        sampleBody = sampleBody.substr(sampleBody.indexOf("=>") + 3);

        sampleBody = allFunctionsImportPrefix.reduce((prev, [funcCall, funcName]) => prev.replace(funcCall, funcName), sampleBody);

        // sampleBody = sampleBody.replace(/enumerable_1\./g, "");
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

        //return ` \`\`\`${sampleBody}\`\`\` -> \`\`\`${formatResultValue(error || sampleResult)}\`\`\` `
        return [sampleBody, formatResultValue(error || sampleResult)];
    });
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
        return "enum [" + Array.from(value).map(formatResultValue).join(", ") + "]";
    }
    if (value[Symbol.iterator]) {
        return "seq [" + Array.from(value).map(formatResultValue).join(", ") + "]";
    }

    if (util.isObject(value)) {
        return `{ ${Object.keys(value).map(key => `${key}:${formatResultValue(value[key])}`).join(", ")} }`;
    }
    return value;
}








// gdy przegladalem operatory dla poszczegolnych technologii to notowalem co w nich jest ciekawe i czego ewentualnie brakuje w powerfp

// todo: ewentualnie kiedys dopisac/zmienic w powerseq 2.0
// - przejrzec dokumntacja do wszystkich operatrow SHARE na pewno wyswietla bledy rezultat!!!!
// - dodac "index"  do funkcji sum i potencjalnie wielu innych 
// - co z sum i avarage ... ? moze am powinny byc sumby i avarageby ? ?? :/
// - moze zip gdy nie ma ostatniej funkcji to powinien zwraca tuple ?
// - kurcze moze dodac "toset" ?? 
// - !! pozbyc sie Enumerable.from(cmds) tzn samo FROM juz chyba niejest potrzebna jak nie ma Enumerable, i inne analogiczne
// - moze funkncje nazwa cycle zamiasat repeat, bo jeszcze jest repeatvalue :/ 
// - moze taki takeWhileIncluded i skipWhileIncluded
// - dodac singleOrDefault() i inne analogiczne aby byla wresja bez wyjatka
// - podniesc wersje TS, zbudowac na mniej sposobow
// - moze usunac wsparcie dla fluent interface -> Enumerable.map().filter(), sprawdzic kto z tego korzysta
// - nowa dokumentacja pod tabelka jako opcja dla tooltip
// - dodac index do flatmap
// - scan - zmiana, powinien zwracac pierwszy element 'seed' od ktorego zaczynamy
// - groupjoin - zmiana, dziala inaczej jak w LINQ, w .net zwraca takze elementy ktory nie maja pasujacego elementu, powerseq pomija takie
// - memoize - implementowalem juz memoize tutaj https://github.com/marcinnajder/misc/blob/master/2022_07_22_code_snippets/TypesScript/seq/quicksort.js#L139
// a tutaj implementacja threadsafe w F# https://github.com/dotnet/fsharp/blob/main/src/FSharp.Core/seq.fs#L1214 
// - share - to nie memoize chodzi o cos takiego
// https://github.com/marcinnajder/misc/blob/master/2021_12_24_advent_of_code_in_fsharp/AdventOfCode/AdventOfCode2021/Day16_packets.fs#L28
// - partition-by - dzialanie jak w clojure, to nawet gdzies w repo "misc" jest zaimplementowane, zwraca Iterable<T[]>
// -- niby taki parition dzielacy na 2 mozna zrobic groupby ale kto by o tym pamietal skoro sam zapominam :/
// - toLookup/assign - ktory dziala jak groupBy ale zwraca Map<K, V[]>
// - countBy - ktory liczy wystapienia dla wskazanego klucza, aby nie robic recznie groupby(x=>x.id).toobject(x=>x.key, x => count(x))
// - pairwise - mozna to samo osiadnac buffer wiec pewnie nie warto to pisac 
// - unzip - przeciwienstwo zip
// - shuffle - miesza elementy, ale chyba sie nie nadaje do leniwej biblioteki, ale wiele bibliotek ma, ale nigdy nie potrzebowalem w sumie
// - interleave, interpose, take-nth,  - clojure nizej w sumie fajne operatory
// - indexed - moze warto dodac aby nie pisac .map( (i,e) => ({i,e}))
// - choose/pick - takie z F# moze warto napisac, nawet moze gdy brak wartosci to null/undefined czyli jak dzialaja (chyba) 
// -- tylko pod nazwami filtermap i findmap
// opertory ?. ?? ??= w JS i sie nie cyrtola (tak samo w clojure obslugiwany jest brak wartosci)
// - unfold - gdy juz jakos bedziemy obslugiwac 'Option' to mozna takze to, ale to samo da sie 'expand' zrobic to moze nie warto
// - https://fxts.dev/docs/map/ po przeglagnieciu 
// -- distinctby, unionby, 	intersectby, exceptby <- ale to wszystko juz mamy przeladowaniacj tych funkcji distinct, .. 
// (trzeba pomyslec na lepszej dokumentacji bo sam tego nie pamietam :/ czy na pewno wszystkie przyklady w dokumentacji
// pokazuja wszystkie przeladniwaa ?? moze tak, dokumentacja na stronie obok tej w tooltip moze poprawi szukanie tych
// operatorow, mozna wtedy mona dodac notatkw ze w innych jezykach ten operator to: ... )
// -- ewentualnie czesc funkcji nie dla kolekcji mozna wrzuci do powerfp
// - https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html#mapFold warto chyba dodac
// - linki z dokumetnacji do kodu a nie do testow
// - moze zamiast tej tabelki mappingu ianczej prezentowac te dane jako np "- filter - filter (LINQ), ... " lub technologie jako podpunkty 
// - allUniqueTyples ? 
// - napisac dokument "migration guid" i na postawie mozna zrobic prezentacje dla zespolu



// function filter<T>(items : Iterable<T>, f: (item: T) => boolean): Iterable<T>{
//     return [];
// }
// function map<T, R>(items : Iterable<T>, f: (item: T) => R): Iterable<R>{
//     return [];
// }
// function find<T>(items : Iterable<T>, f: (item: T) => boolean ): T | undefined{
//     return undefined;
// }
// function filtermap<T,R>(items : Iterable<T>, f: (item: T) => null | undefined /*| false*/ | R): Iterable<R>{
//     return [];
// }
// function findmap<T,R>(items : Iterable<T>, f: (item: T) => null | undefined /*| false*/ | R): R | undefined {
//     return undefined;
// }
// interface Person{
//     id: number;
//     name: string;
//     address?: {
//         city:string
//     };
// }
// var people : Person[] = [];
// var aa0 = map(filter(people, p => p.id > 10), x => x.name);
// var bb0 = find(people, p => p.id > 10)?.name;
// var aa1 = filtermap(people, p => p.id > 10 ? p.name : undefined);
// var aa2 = filtermap(people, p => p.id > 10 && p.name); 
// var aa3 = filtermap(people, p => p.address?.city);
// var aa00 = map(filter(people, p => !!p.address), p => p.address?.city);
// var bb1 = findmap(people, p => p.id > 10 ? p.name : undefined);


// -----> JS Array

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


// -----> Rx JS
// - catch(selector: function): Observable
// Catches errors on the observable to be handled by returning a new observable or throwing an error.
// - partition -> to mial lodash i 
// - share -> to takze jest w Ix.net
// - retry -> jesli moze znajdzie sie jakis fajny case rzeczywistego uzycia? (generalnie inne takze do wyjatkow moze byc fajne jesli sie znajdzie przypadek)


// -----> F#
// - cache -> taki memoize zdaje sie, ale niby poki idziem po nim to keszuje, ale jak dojdziemy do konca to czysci
// - choose - w powerseq takiego nie ma bo w sumie nie mamy "Option<T>", moze zwykly undefined/null mozna do tego wykorzystac
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


// --->>> Ix

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


// --->>> clojure
// https://clojure.org/api/cheatsheet
// https://clojure-doc.org/articles/language/collections_and_sequences/ !!
// https://aphyr.com/posts/304-clojure-from-the-ground-up-sequences !!

// - remove - to takie zaprzeczenie filter
// - keep - to takie polaczenie filter i map, to taki choose z F#, jak zwraca nil to mam pomijac, jak inna wartosc to ja zwracac
// - take-nth - zwraca co nty element w kolekcj
// - interleave - przyjmuje 2 (albo wiecej) sekwencji i zwraca jedna sekwencje gdzie sa wszystkie pierwsze, potem wszystkie drugie, wszystkie trzecie, ... w sumie podobne do zip ale nie laczy tylko elementow tylko zwraca kolejne, to wygodne jak z 2 kolekcji chcemy zrobic mape gdzie nieparzyste to klucze a parzyste to wartosci
// - interpose - dajemy separator ktory bedzie wstawiany pomiedzy elementy sekwencji takze przekazanej
// - partition, partition-by - podaje sie 'n' elemento w paczce oraz opcjonlanie 'step' dzieki temu to moze dzialac jak chunk (gdzie paczki elementow sa jedna po drugiej) lub 'windowed/pairwise' gdzie nachodza na siebie 
// - partition-by - jest inny jak partition/partition-by bo nie podaje sie ilosc elementow ale funkcje ktora decyduje czy nastepna pacza ma powstarac, w innych technologiach jest "partition" ale tak przekazuje sie funkche ktora zwraca 'boolean' i finalnie zwracana jest para kolekcji, tutaj jest to bardziej uniwersalne
// - (split-at n coll) - Returns a vector of [(take n coll) (drop n coll)]
// - (split-with pred coll) - Returns a vector of [(take-while pred coll) (drop-while pred coll)]


/// ----->>> kotlin
// https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.sequences/-sequence/
// - ogolne uwagi do operatorow:
// -- funkcje xxxTo - czesto dzialaja jak ich odpowiedniki xxx tylko przyjmuja MutableList/MutableMap do ktorego wbijaja dane i go zwracaja
// -- funcje xxxWith - taki minWith przyjmuje implementacja interfejsu Comparator<T>, minBy przyjmuje lamde, to w kilku miejcach jest konwencja np sortedWith
// -- associateTo/associateByTo/WithTo - jak bez ...To

// - fun <T> Sequence<T>.constrainOnce(): Sequence<T> -Returns a wrapper sequence that provides values of this sequence, but ensures it can be iterated only one time. The operation is intermediate and stateless. IllegalStateException is thrown on iterating the returned sequence for the second time and the following times.
// - contains - Returns true if element is found in the sequence.
// - fun <reified R> Sequence<*>.filterIsInstance(): Sequence<R> Returns a sequence containing all elements that are instances of specified type parameter R. The operation is intermediate and stateless. "animals.filterIsInstance<Cat>()"
// - fun <T> Sequence<T>.filterNot( predicate: (T) -> Boolean): Sequence<T> Returns a sequence containing all elements not matching the given predicate. The operation is intermediate and stateless.
// - inline fun <T> Sequence<T>.indexOfLast( predicate: (T) -> Boolean ): Int Returns index of the last element matching the given predicate, or -1 if the sequence does not contain such element. The operation is terminal.
// - joinTo/joinToString - dosyc rozbudowana funkcja z wieloma opcjonalnymi argumentami ktora potrafi polaczyc wszystkie elementy do jednej wartosci np String, ale wlasnie nie koniecznie
// - minus, minusElement, plus, plusElement - to potem w kodzie mozna napisac operator + lub - 
// - inline fun <T> Sequence<T>.partition( predicate: (T) -> Boolea ): Pair<List<T>, List<T>> Splits the original sequence into pair of lists, where first list contains elements for which predicate yielded true, while second list contains elements for which predicate yielded false.
// - shuffled - zwraca pomieszane elementy
// - unzip - odwrotnosc "zip"
// - fun <T> Sequence<T>.withIndex(): Sequence<IndexedValue<T>> (source) - zwraca 'IndexedValue(index: Int, value: T)'



/// ----->>> java
// https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/util/stream/Stream.html
// https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/util/stream/package-summary.html#MutableReduction
// https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/util/stream/Collectors.html

// - collect(Collector<? super T,A,R> collector) - Performs a mutable reduction operation on the elements of this stream using a Collector.
// - noneMatch(Predicate<? super T> predicate) Returns whether no elements of this stream match the provided predicate.
// - Java nawet miala collector ktory robil "partitioningBy" ale niestety lambda zwraca boolean czyli dzieli jedynie na 2 zbiory
// -- static <T> Collector<T,?,Map<Boolean,List<T>>> partitioningBy(Predicate<? super T> predicate) Returns a Collector which partitions the input elements according to a Predicate, and organizes them into a Map<Boolean, List<T>>.
// - flatMap/map/mapMulti ... To ... Double/Long/Double - dedykowane metody dla prymitywow

// - LINQ/strumienie w Java to jest jakas masakra, w sumie nie dziwie sie ze strumienie moga zniechecic do korzystania
// -- w powerseq -> pipe(people, groupby(p => p.city), toobject( gr => gr.key, gr => maxBy(gr, g => g.height))
// -- nizej w Java ->
//  Comparator<Person> byHeight = Comparator.comparing(Person::getHeight);
//  Map<City, Optional<Person>> tallestByCity
//    = people.stream().collect(
//      groupingBy(Person::getCity,
//                 reducing(BinaryOperator.maxBy(byHeight))));

// - maja taki collector ktory potrafi na raz liczy wiele agregatow min/max/count/avg/sum, ale w sumie to mozna 'reduce' zrobic
// -- https://docs.oracle.com/en/java/javase/19/docs/api/java.base/java/util/DoubleSummaryStatistics.html
// -- https://ramj2ee.blogspot.com/2017/09/how-to-use-averagingint-summingint-and.html























// <span data-tooltip="Sentence one here. Sentence&#xa;two here. Sentence three here.">See my CSS tooltip with HTML-entity &amp;#xa; line break:</span>

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
