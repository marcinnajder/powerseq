import { pipe, groupby, map, toarray, toobject, flatmap, count, take } from "./index"


type Coder = { name: string; language: string; }

const coders: Coder[] = [{ name: "kalinka", language: "ts" }, { name: "michal", language: "ts" }, { name: "maciek", language: "haskell" },]

// const result1 = groupby(coders, c => c.language)

// for (const [key, values] of result1) {

// }



const result2 = pipe(coders, groupby(c => c.language));

const result3 = groupby(coders, c => c.language, c => c.name)
const result4 = pipe(coders, groupby(c => c.language, c => c.name));

// resultSelector
const result5 = pipe(coders, groupby(c => c.language), map(([key, values]) => ({ key, values })), toarray());
const result6 = pipe(coders, groupby(c => c.language, c => c.name), map(([language, names]) => ({ language, names })), toarray());

const result7 = pipe(coders, groupby(c => c.language, c => c.name), flatmap(([language, names]) => names), toarray());


// do toobject trzeba podac obie funkcje, wczesniej tez tak bylo
const result8 = pipe(coders, groupby(c => c.language), toobject(([key]) => key, ([key, values]) => values));
const result9 = pipe(coders, groupby(c => c.language, c => c.name), toobject(([key]) => key, ([key, names]) => names));
const result10 = pipe(coders, groupby(c => c.language), toobject__);




// tomap
// toobject 

// console.log(result10);

// var m = new Map<number, number>();
// m.set(1, 10);
// m.set(2, 20);
// var obj = toobject__(m);
// console.log(obj)

function toobject__<K, V>(map: Iterable<[K, V]>): { [key: string]: V } {
    return Object.fromEntries(map);
}

// console.log(toobject(coders, c => c.language));


// console.log(result1);
// console.log(result2);
// console.log(result3);
// console.log(result4);
//console.log(result5);
// console.log(result10);




// console.log(groupby(coders, c => c.language));