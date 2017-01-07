import * as assert from "assert";
import { Enumerable, reduce } from "../../src/index";

it('reduce', function () {
    assert.deepEqual(reduce([1, 2, 3, 4], (p, c) => p + c), 1 + 2 + 3 + 4);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).reduce((p, c) => p + c), 1 + 2 + 3 + 4);

    assert.throws(() => {
        var r = Enumerable.from([]).reduce((p, c) => p + c);
    }, "'Sequence contains no elements' exception should be thrown");

    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).reduce((p, c) => ({ text: p.text + c }), { text: "-" }), { text: "-1234" });
    assert.deepEqual(Enumerable.from([]).reduce((p, c) => { throw new Error(); }, { text: "-" }), { text: "-" });
});

export const samples = [
    () => reduce([1, 2, 3], (a, x) => a + x),
    () => reduce([1, 2, 3], (a, x) => a + (x * 10), '')
];

export const jsarray = "reduce";
export const linq = "Aggregate";
export const lodash = "reduce";
