import * as assert from "assert";
import { skipwhile } from "../../src/index";

it('skipwhile', function () {
    assert.deepEqual([...skipwhile([1, 2, 3, 4], x => x < 3)], [3, 4]);

    assert.deepEqual([...skipwhile([1, 2, 3, 4], x => true)], []);
    assert.deepEqual([...skipwhile([1, 2, 3, 4], x => false)], [1, 2, 3, 4]);
    assert.deepEqual([...skipwhile([1, 2, 3, 4], x => x < 3)], [3, 4]);
    assert.deepEqual([...skipwhile([1, 2, 3, 4], (x, index) => index < 3)], [4]);

    assert.deepEqual([...skipwhile((x: number) => x < 3)([1, 2, 3, 4])], [3, 4]);
});

export const samples = [
    () => skipwhile([1, 2, 2, 3, 3, 4, 5], x => x < 3)
];

export const linq = "SkipWhile";
export const lodash = "dropWhile";
export const rxjs = "skipWhile";
export const fsharp = "skipWhile";
export const kotlin = "dropWhile";
export const clojure = "drop-while";
export const java = "dropwhile";