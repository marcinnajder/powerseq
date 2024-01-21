
import { distinct, pipe, groupby, map, toarray, toobject, flatmap, count, take, range, zip, memoize, share, maxby, max, countby, toobjectgrouping, filter, filtermap, sum, flat } from "../src/index";
import { groupby1 } from "../src/operators/groupby1";



type AocCoder = { id: string; name: string; language: string; completed: number; }



const coders: AocCoder[] = [
    { id: "kr", name: "kalinka", language: "ts", completed: 15 },
    { id: "mh", name: "michal", language: "ts", completed: 5 },
    { id: "jw", name: "julia", language: "ts", completed: 18 },
    { id: "mj", name: "maciejj", language: "haskell", completed: 15 },
    { id: "mf", name: "maciejf", language: "csharp", completed: 4 },
    { id: "hb", name: "hubert", language: "csharp", completed: 2 },
];




// ********************************
// toobject (1:1) -> jak dziala tobject

// console.log(toobject(coders, c => c.id)); // Dictionary<AocCoder>
// console.log(toobject(coders, c => c.id, c => c.name)); // Dictionary<string>
// console.log(toobject(coders, c => c.id, (c, key) => key + " - " + c.name)); // new! (key w lambda)


// ********************************
// groupby1 vs group (1:*) -> jak zmienilo sie API

// const grs1 = groupby1(coders, c => c.language); // Iterable<IterableGroup<string, AocCoder>>
// // const grs1 = groupby1(coders, c => c.language, c => c.name); // Iterable<IterableGroup<string, string>>

// for (const gr1 of grs1) {
//     const key = gr1.key    
//     const values = [...gr1]; // Iterable<T> -> Array<T>

//     console.log("KEY: ", key);
//     for (const value of values) {
//         console.log(" VALUE: ", value);
//     }
// }


// //const grs2 = groupby(coders, c => c.language); // Map<string, AocCoder[]> : Iterable<[string, AocCoder[]]> { ... }
// const grs2 = groupby(coders, c => c.language, c => c.name); // Map<string, string[]>


// for (const [key, values] of grs2) {
//     console.log("KEY: ", key);
//     for (const value of values) {
//         console.log(" VALUE: ", value);
//     }
// }



// ********************************
// toobject vs groupby -> czym rozni sie toobject od groupby (1:1 vs 1:*,  JS Object vs Map)

// console.log(toobject(coders, c => c)); // Dictionary<AocCoder>
// console.log(groupby(coders, c => c)); // Map<AocCoder, AocCoder[]>


// ********************************
// groupby1/groupby -> jak dzialal 'resultSelector'


// console.log([...groupby1(coders, c => c.language, c => c, (key, values) => ({ language: key, coders: [...values] }))]);
// console.log([...pipe(groupby(coders, c => c.language), map(([key, values]) => ({ language: key, coders: values })))]);


// ********************************
// groupby -> typowe operacje z groupby(agregacje + zwrocenie sekwencji)

// console.log([...pipe(groupby(coders, c => c.language), map(([language, cs]) => ({ language, maxCompleted: max(cs, c => c.completed) })))]);
// console.log([...pipe(groupby(coders, c => c.language, c => c.completed), map(([language, completes]) => ({ language, maxCompleted: max(completes) })))]); // to samo

// console.log([...pipe(groupby(coders, c => c.language, c => c.name), map(([language, names]) => ({ language, names: names.join(', ') })))]);

// console.log([...pipe(groupby(coders, c => c.language), map(([language, cs]) => ({ language, count: cs.length })))]);

// console.log(countby(coders, c => c.language)); // Map<STRING, number> // new! operator countby
// console.log(countby(coders, c => c.completed)); // Map<NUMBER, number>





// ********************************
// groupby + object -> grupujemy po to, aby stworzyc obiekt JS (zamiast Map)

// console.log(pipe(groupby(coders, c => c.language), toobject(([key, values]) => key, ([key, values]) => values.map(c => c.name))));

// console.log(pipe(groupby(coders, c => c.language, c => c.name), toobject(([key, values]) => key, ([key, values]) => values))); // to samo

// console.log(pipe(groupby(coders, c => c.language, c => c.name), toobject())); // to samo // new! toobject() bez parametrow

// console.log(pipe(groupby(coders, c => c.language, c => c.name), toobject(([key, values]) => key))); // to NIE JEST samo

// console.log(toobjectgrouping(coders, c => c.language, cs => cs.map(c => c.name))); // to samo // new! operator toobjectgrouping

// toobject vs toobjectgrouping

// console.log(toobject(coders, c => c.id)); // Dictionary<AocCoder> 
// console.log(toobjectgrouping(coders, c => c.language)); // Dictionary<AocCoder[]>

// console.log(toobject(coders, c => c.id, c => c.name)); // Dictionary<string> 
// console.log(toobjectgrouping(coders, c => c.language, cs => cs.map(c => c.name))); // Dictionary<string[]> 


// ********************************
// filtermap 

// console.log([...pipe(coders, filter(c => c.completed > 0), map(c => c.name))]);

// console.log([...filtermap(coders, c => c.completed > 0 ? c.name : null)]);


// const stats = groupby(coders, c => c.language, c => c.completed); // Map<string, number[]>

// console.log([...pipe(
//     stats,
//     filter(([lang, completes]) => sum(completes) > 5), // execute 'sum'
//     map(([lang, completes]) => `${lang}: ${sum(completes)}`)) // execute 'sum'
// ]);

// console.log([...pipe(
//     stats,
//     map(([lang, completes]) => ({ lang, total: sum(completes) })),
//     filter(({ lang, total }) => total > 5),
//     map(({ lang, total }) => `${lang}: ${total}`))
// ]);

// console.log([...filtermap(stats, (([lang, completes]) => {
//     const total = sum(completes)
//     return total > 5 ? `${lang}: ${total}` : null
// }))]);

// console.log([...filtermap(stats, (([lang, completes]) => pipe(sum(completes), total => total > 5 ? `${lang}: ${total}` : null)))]);



// ********************************
// flat

//console.log([...flatmap([[1], [2, 3], [4, 5], [6], []], x => x)]); // tylko Iterable<Iterable<T>>

// console.log([0, 0, 0, [1], [2, 3], [4, 5], [6], []].flat()); // Array.flat, dowolna ilosc poziomow
// console.log([...flat([0, 0, 0, [1], [2, 3], [4, 5], [6], []])]);

// const flatten = flat([1, [2, 3], [[4, 5], [], 6], []], 2); // zwracany tym zmienia sie w zaleznosci od przekazanego parametru 'depth'

// console.log([...flatten]);

// console.log([...flat(['a', ['b', ['c', 'd']], 'e'], (item, depth) => typeof item !== 'string')]); // obsluga typu 'string' ktory jest Iterable<string>


// ********************************
// memoize vs share

// const exec = (transform: <T>(s: Iterable<T>) => Iterable<T>) =>
//     pipe(range(0, 4), map(i => ({ i })), transform, xs => zip(xs, xs, (x1, x2) => [x1.i, x2.i, x1 === x2]), toarray());

// console.log(exec(s => s));
// console.log(exec(memoize()));
// console.log(exec(share()));




// const a1 = groupby(coders, c => c.language);
// const a2 = groupby(coders, c => c.language, c => c.name);
// const a3 = toobjectgrouping(coders, c => c.language, c => c.name);

