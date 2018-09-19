import * as assert from "assert";
import { Enumerable, skipwhile } from "../../src/enumerable";

it('skipwhile', function () {
    assert.deepEqual(Array.from(skipwhile([1, 2, 3, 4], x => x < 3)), [3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skipwhile(x => true).toarray(), []);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skipwhile(x => false).toarray(), [1, 2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skipwhile(x => x < 3).toarray(), [3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skipwhile((x, index) => index < 3).toarray(), [4]);

    assert.deepEqual(Array.from(skipwhile(x => x < 3)([1, 2, 3, 4])), [3, 4]);
});

export const samples = [
    () => skipwhile([1, 2, 2, 3, 3, 4, 5], x => x < 3)
];

export const linq = "SkipWhile";
export const lodash = "dropWhile";
export const rxjs = "skipWhile";
export const fsharp = "skipWhile";