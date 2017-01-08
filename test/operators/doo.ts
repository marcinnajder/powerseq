import * as assert from "assert";
import { Enumerable, doo } from "../../src/index";

it('doo', function () {
    var items: number[] = [];

    assert.deepEqual(Enumerable
        .from([1, 2, 3])
        .doo((x, index) => items.push(x + index))
        .toarray()
        , [1, 2, 3]);

    assert.deepEqual(items, [1 + 0, 2 + 1, 3 + 2]);
});

export const samples = [
    () => doo([1, 2, 3,], (x) => { /* executed during iteration */; }),
];

export const rxjs = "do";