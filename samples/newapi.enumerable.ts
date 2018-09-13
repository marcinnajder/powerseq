import { print, isEven } from "./newapi";
import { Enumerable } from "../src/enumerable";

print(Enumerable
    .from([1, 2, 3, 4, 5])
    .filter(isEven)
    .map(x => x.toString())
    .filter(x => x != "2")
    .map(x => parseInt(x))
);

// //var aa = pipe([1, 2, 3]);
// var aa = pipe(
//     [1, 2, 3, 4, 5, 6, 7],
//     filter(x => x % 2 === 0),
//     map(x => x.toString()),
//     filter(x => x != "2"),
//     map(x => parseInt(x)),
// );
// print(aa);






// function print<T>(iterable: Iterable<T>) {
//     console.log([...iterable]);
// }
// function isEven(n: number): boolean {
//     return n % 2 === 0;
// }