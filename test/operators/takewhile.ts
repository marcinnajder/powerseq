import * as assert from "assert";
import { pipe, takewhile } from "../../src/index";

it('takewhile', function () {
    assert.deepEqual([...takewhile([1, 2, 3, 4], x => x < 3)], [1, 2]);
    assert.deepEqual([...takewhile([1, 2, 3, 4], x => true)], [1, 2, 3, 4]);
    assert.deepEqual([...takewhile([1, 2, 3, 4], x => false)], []);
    assert.deepEqual([...takewhile([1, 2, 3, 4], x => x < 3)], [1, 2]);
    assert.deepEqual([...takewhile([1, 2, 3, 4], (x, index) => index < 3)], [1, 2, 3]);

    assert.deepEqual([...takewhile((x: number) => x < 3)([1, 2, 3, 4])], [1, 2]);

    const stringsOrNumbers = ["1", "2", 3, 4];

    const strings1 = takewhile(stringsOrNumbers, x => typeof x === "string");
    assert.deepEqual([...strings1], ["1", "2"]);

    const strings2 = pipe(stringsOrNumbers, takewhile(x => typeof x === "string"));
    assert.deepEqual([...strings2], ["1", "2"]);
});

export const samples = [
    () => takewhile([1, 2, 2, 3, 3, 4, 5], x => x < 3)
];

export const linq = "TakeWhile";
export const lodash = "takeWhile";
export const rxjs = "takeWhile";
export const fsharp = "takeWhile";
export const kotlin = "takeWhile";
export const clojure = "take-while";
export const java = "takeWhile";