import * as assert from "assert";
import { map, pairwise, pipe } from "../../src/index";

it('pairwise', function () {
    assert.deepEqual([...pairwise([])], []);
    assert.deepEqual([...pairwise([1])], []);
    assert.deepEqual([...pairwise([1, 2])], [[1, 2]]);
    assert.deepEqual([...pairwise([1, 2, 3])], [[1, 2], [2, 3]]);

    assert.deepEqual([...pipe([1, 2, 3], pairwise(), map(([prev, next]) => `${prev}-${next}`))], ["1-2", "2-3"]);
});

export const samples = [
    () => pairwise([1, 2, 3, 4]),
];

export const rxjs = "pairwise";
export const fsharp = "pairwise";
