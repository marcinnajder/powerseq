import { isIterable } from "../src/common/wrap";
import { filter, pipe, map, range, reduce, average } from "../src/index";

print([...filter([1, 2, 3, 4, 5], isEven)]);
print([...filter<number>(isEven)([1, 2, 3, 4, 5])]);


//var aa = pipe([1, 2, 3]);
var aa = pipe(
    [1, 2, 3, 4, 5, 6, 7],
    map(x => x.toString()),
    average(x => parseInt(x)),

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