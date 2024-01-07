import * as assert from "assert";
import { subsets, pipe, range } from "../../src/index";

it('subsets', function () {

    assert.deepEqual([...subsets([], 1)], []);

    assert.deepEqual([...subsets([1, 2, 3], -1)], []);
    assert.deepEqual([...subsets([1, 2, 3], 5)], []);
    assert.deepEqual([...subsets([1, 2, 3], 3)], [[1, 2, 3]]);

    assert.deepEqual([...subsets([1, 2, 3], 1)], [[1], [2], [3]]);

    assert.deepEqual([...subsets([1, 2, 3, 4], 2)], [[1, 2], [1, 3], [2, 3], [1, 4], [2, 4], [3, 4]]);

    assert.deepEqual([...subsets([1, 2, 3, 4], 3)], [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]);

    assert.deepEqual([...subsets(range(1, 3), 3)], [[1, 2, 3]]);
});

export const samples = [
    () => subsets([1, 2, 3, 4], 2),
    () => subsets([1, 2, 3, 4], 3)
];


