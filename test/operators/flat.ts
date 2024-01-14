import * as assert from "assert";
import { flat, pipe } from "../../src/index";

it('flat', function () {
    // const a = flat([0, [1], [[2]], [[[3]]]]);
    // console.log([...a]);

    assert.deepEqual([...flat([1, 2, 3])], [1, 2, 3]);
    assert.deepEqual([...flat([1, [2, 3], [], 4])], [1, 2, 3, 4]);

    assert.deepEqual([...flat([1, [2, 3], [], 4, [[5, 6], 7]])], [1, 2, 3, 4, [5, 6], 7]);
    assert.deepEqual([...flat([1, [2, 3], [], 4, [[5, 6], 7]], 2)], [1, 2, 3, 4, 5, 6, 7]);

    const items = [0, [1], [[2]], [[[3]]]];
    assert.deepEqual([...flat(items)], [0, 1, [2], [[3]]]);
    assert.deepEqual([...flat(items, 1)], [0, 1, [2], [[3]]]);
    assert.deepEqual([...flat(items, 2)], [0, 1, 2, [3]]);
    assert.deepEqual([...flat(items, 3)], [0, 1, 2, 3]);

    assert.deepEqual([...pipe(items, flat())], [0, 1, [2], [[3]]]);
    assert.deepEqual([...pipe(items, flat(1))], [0, 1, [2], [[3]]]);
    assert.deepEqual([...pipe(items, flat(2))], [0, 1, 2, [3]]);
    assert.deepEqual([...pipe(items, flat(3))], [0, 1, 2, 3]);

    const strings = flat(["a", ["b", ["c", "d"]], "e"], (item, depth) => typeof item !== "string");
    assert.deepEqual([...strings], ["a", "b", "c", "d", "e"]);
});

export const samples = [
    () => flat([1, [2, 3], [[4, 5], 6], []]),
    () => flat([1, [2, 3], [[4, 5], 6], []], 1),
    () => flat([1, [2, 3], [[4, 5], 6], []], 2),
    () => flat(["a", ["b", ["c", "d"]], "e"], (item, depth) => typeof item !== "string")
];


export const jsarray = "flat~";
export const lodash = "flatten";
export const kotlin = "flatten";
export const clojure = "flatten~";


// ************************************
// simpler "one level" implementation


// it('flat', function () {
//     assert.deepEqual([...flat([[1, 2], [3, 4, 5], [6]])], [1, 2, 3, 4, 5, 6]);
//     assert.deepEqual([...flat(["ab", "cde", "f"])], ["a", "b", "c", "d", "e", "f"]);
//     assert.deepEqual([...pipe([[1, 2], [3, 4, 5], [6]], flat())], [1, 2, 3, 4, 5, 6]);
// });

// export const samples = [
//     () => flat([[1, 2], [3, 4, 5], [6]]),
//     () => flat(["ab", "cde", "f"])
// ];
