import { pipe, groupby, map, toarray, toobject, flatmap, count, take, range, zip, memoize, share } from "../src/index"


const coders: Coder[] = [{ name: "kalinka", language: "ts" }, { name: "michal", language: "ts" }, { name: "maciek", language: "haskell" },]


const exec = (transform: <T>(s: Iterable<T>) => Iterable<T>) =>
    pipe(range(0, 4), map(i => ({ i })), transform, xs => zip(xs, xs, (x1, x2) => [x1.i, x2.i, x1 === x2]), toarray());

console.log(exec(s => s));
console.log(exec(memoize()));
console.log(exec(share()));


type Coder = { name: string; language: string; }



// const result1 = groupby(coders, c => c.language)

// for (const [key, values] of result1) {

// }



// function* return123() {
//     yield 1;
//     yield 2;
//     yield 3;
// }



// var itera1 = return123();
// var itera2 = return123();
// console.log(itera1 === itera2);


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