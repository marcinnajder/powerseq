import { isIterable } from "../src/common/wrap";
import { filter, pipe, map, range, reduce, average, zip, buffer, cast, concat, concatp, count, defaultifempty, distinct, distinctuntilchanged, doo, elementat, every, except, expand, find, findindex, flatmap, foreach, groupby } from "../src/index";
import { Enumerable } from "../src/enumerable";




var x = [...groupby(["a", "b", "vv", "t", "qwe"], x => x.length)];
//var x = count([1, 2, 3, 4, 5], isEven);
print(x);




//var aa = pipe([1, 2, 3]);
var aa = pipe(
    ["a", "b", "vv", "t", "qwe"],
    groupby(x => x.length),
    map(x => x.key)

    //defaultifempty(123),


    // [new Date(), new Date()],
    //buffer(2, 2)
    // map(x => x + "!")
    // average(x => parseInt(x)),

    //reduce((p, c) => p + c, "")
    // range(1, 7),
    // filter(x => x % 2 === 0),
    // map(x => x.toString()),
    // filter(x => x != "2"),
    // map(x => parseInt(x)),
);
print(aa);


export function print<T>(iterable: Iterable<T> | T) {
    if (typeof iterable === "string") { // string type is iterable
        console.log(iterable);
    } else if (isIterable(iterable)) {
        console.log([...iterable]);
    } else {
        console.log(iterable);
    }
}

export function isEven(n: number): boolean {
    return n % 2 === 0;
}