import {Enumerable} from "../src/index";
// import {Enumerable} from "../src/enumerable";
// import "../src/enumerable/from";
// import  "../src/operators/concat";
// import  "../src/operators/toarray";


import {concat} from "../src/operators/concat";
console.log(Array.from(concat([1,2],[4,5])));

console.log(Enumerable.from);
console.log(Enumerable.from([1,2,3]).concat([4,5,6]).toarray());



console.log(

Enumerable
    .range(1,Number.MAX_VALUE)
    .take(10)
    .filter(x => x %2 == 0)
    .toarray()
    
);






