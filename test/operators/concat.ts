import * as assert from "assert";
import { Enumerable, concat, concatp } from "../../src/enumerable";

it('concat', function () {
    assert.deepEqual(Array.from(concat([1, 2, 3], [4, 5], [6, 7])), [1, 2, 3, 4, 5, 6, 7]);
    assert.deepEqual(Enumerable.from([1, 2, 3]).concat().toarray(), [1, 2, 3]);
    assert.deepEqual(Enumerable.from([1, 2, 3]).concat([4, 5], [6, 7]).toarray(), [1, 2, 3, 4, 5, 6, 7]);

    assert.deepEqual(Array.from(concatp([4, 5], [6, 7])([1, 2, 3])), [1, 2, 3, 4, 5, 6, 7]);
});

export const linq = "Concat";

export const samples = [
    () => concat([1, 2], [3, 5], [6])
];

export const jsarray = "concat";
export const lodash = "concat";
export const rxjs = "concat";
export const fsharp = "append";