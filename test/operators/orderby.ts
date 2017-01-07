import * as assert from "assert";
import { Enumerable, OrderedEnumerable, orderby, orderbydescending, thenby } from "../../src/index";

it('orderby', test);
export function test() {
    var numers = [1, 5, 4, 3, 5, 6, 8, 1];
    assert.deepEqual(Array.from(orderby(numers, x => x)), numers.sort());
    assert.deepEqual(Array.from(orderbydescending(numers, x => x)), numers.sort().reverse());

    var numbersNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    assert.deepEqual(Enumerable.from(numbersNames).orderbydescending(x => x.length).thenby(x => x).toarray(),
        ['eight', 'seven', 'three', 'five', 'four', 'nine', 'one', 'six', 'ten', 'two']
    );

    var items = [
        { a: 3, b: 10, c: 200 },
        { a: 1, b: 20, c: 1 },
        { a: 2, b: 10, c: 1 },
        { a: 3, b: 10, c: 100 },
        { a: 2, b: 20, c: 1 },
        { a: 3, b: 20, c: 300 }
    ];
    assert.deepEqual(Enumerable.from(items).orderby(x => x.a).thenbydescending(x => x.b).thenby(x => x.c).toarray(),
        [
            { a: 1, b: 20, c: 1 },
            { a: 2, b: 20, c: 1 },
            { a: 2, b: 10, c: 1 },
            { a: 3, b: 20, c: 300 },
            { a: 3, b: 10, c: 100 },
            { a: 3, b: 10, c: 200 }
        ]
    );
}

export const samples = [
    () => orderby([1, 4, 2, 3, 5, 1], x => x),
    () => orderby(['abc', 'dd', 'sdfe', 'f'], x => x.length)
];

export const jsarray = "sort";
export const linq = "OrderBy";
export const lodash = ["orderBy", "sortBy"];

