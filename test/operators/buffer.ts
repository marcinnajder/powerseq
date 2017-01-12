import * as assert from "assert";
import { Enumerable, buffer } from "../../src/index";

it('buffer', function () {
    var from1to9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    assert.deepEqual(Array.from(buffer(from1to9, 3)), [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    assert.deepEqual(Enumerable.from(from1to9).buffer(4).toarray(), [[1, 2, 3, 4], [5, 6, 7, 8], [9]]);
    assert.deepEqual(Enumerable.from<number>([]).buffer(4).toarray(), []);

    assert.deepEqual(Array.from(buffer(from1to9, 3, 3)), [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    assert.deepEqual(Array.from(buffer(from1to9, 3, 6)), [[1, 2, 3], [7, 8, 9]]);
    assert.deepEqual(Array.from(buffer(from1to9, 3, 8)), [[1, 2, 3], [9]]);
    assert.deepEqual(Array.from(buffer(from1to9, 3, 9)), [[1, 2, 3]]);

    assert.deepEqual(Array.from(buffer(from1to9, 3, 2)), [[1, 2, 3], [3, 4, 5], [5, 6, 7], [7, 8, 9], [9]]);

    assert.deepEqual(Array.from(buffer(from1to9, 10, 3)), [[1, 2, 3, 4, 5, 6, 7, 8, 9], [4, 5, 6, 7, 8, 9], [7, 8, 9]]);
});

export const samples = [
    () => buffer([1, 2, 3, 4, 5, 6, 7], 2),
    () => buffer([1, 2, 3, 4, 5, 6, 7], 2, /*skip*/4)
];


export const lodash = "chunk";
export const rxjs = ["bufferCount", "pairwise"];
export const fsharp = ["windowed", "pairwise"];