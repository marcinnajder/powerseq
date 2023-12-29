import * as assert from "assert";
import { reduce } from "../../src/index";

it('reduce', function () {
    assert.deepEqual(reduce([1, 2, 3, 4], (p, c) => p + c), 1 + 2 + 3 + 4);

    assert.throws(() => {
        var r = reduce([], (p: number, c: number) => p + c);
    }, "'Sequence contains no elements' exception should be thrown");

    assert.deepEqual(reduce([1, 2, 3, 4], (p, c) => ({ text: p.text + c }), { text: "-" }), { text: "-1234" });
    assert.deepEqual(reduce([], (p, c) => { throw new Error(); }, { text: "-" }), { text: "-" });

    assert.deepEqual(reduce<number>((p, c) => p + c)([1, 2, 3, 4]), 1 + 2 + 3 + 4);
    assert.deepEqual(reduce<number, string>((p, c) => p + c, "")([1, 2, 3, 4]), "1234");
});

export const samples = [
    () => reduce([1, 2, 3], (a, x) => a + x),
    () => reduce([1, 2, 3], (a, x) => a + (x * 10), '')
];

export const jsarray = "reduce";
export const linq = "Aggregate";
export const lodash = "reduce";
export const rxjs = "reduce";
export const fsharp = ["fold", "reduce"];
export const kotlin = ["fold", "reduce", "reduceOrNull"];
export const clojure = "reduce";
export const java = "reduce";

