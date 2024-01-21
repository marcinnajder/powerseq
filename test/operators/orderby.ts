import * as assert from "assert";
import { orderby, orderbydescending, thenby, pipe, thenbydescending } from "../../src/index";

it('orderby', test);

export function test() {
    const numers = [1, 5, 4, 3, 5, 6, 8, 1];

    assert.deepEqual([...orderby(numers, x => x)], numers.sort());
    assert.deepEqual([...orderbydescending(numers, x => x)], numers.sort().reverse());

    const numbersNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

    assert.deepEqual([...pipe(numbersNames, orderbydescending(x => x.length), thenby(x => x))],
        ['eight', 'seven', 'three', 'five', 'four', 'nine', 'one', 'six', 'ten', 'two']
    );

    const items = [
        { a: 3, b: 10, c: 200 },
        { a: 1, b: 20, c: 1 },
        { a: 2, b: 10, c: 1 },
        { a: 3, b: 10, c: 100 },
        { a: 2, b: 20, c: 1 },
        { a: 3, b: 20, c: 300 }
    ];
    assert.deepEqual([...pipe(items, orderby(x => x.a), thenbydescending(x => x.b), thenby(x => x.c))],
        [
            { a: 1, b: 20, c: 1 },
            { a: 2, b: 20, c: 1 },
            { a: 2, b: 10, c: 1 },
            { a: 3, b: 20, c: 300 },
            { a: 3, b: 10, c: 100 },
            { a: 3, b: 10, c: 200 }
        ]
    );

    assert.deepEqual([...orderby((x: number) => x)(numers)], numers.sort());
}

export const samples = [
    () => orderby([1, 4, 2, 3, 5, 1], x => x),
    () => orderby(['abc', 'dd', 'sdfe', 'f'], x => x.length)
];

export const jsarray = "sort";
export const linq = "OrderBy";
export const lodash = ["orderBy", "sortBy"];
export const fsharp = ["sort", "sortBy"];
export const kotlin = ["sorted", "sortedBy"];
export const clojure = ["sort", "sort-by"];
export const java = "sorted";

