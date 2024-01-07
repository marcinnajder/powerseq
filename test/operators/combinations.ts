import * as assert from "assert";
import { combinations, range } from "../../src/index";

it('combinations', function () {
    assert.deepEqual([...combinations([], 1)], []);

    assert.deepEqual([...combinations([1, 2, 3], -1)], []);
    assert.deepEqual([...combinations([1, 2, 3], 5)], []);
    assert.deepEqual([...combinations([1, 2, 3], 3)], [[1, 2, 3]]);

    assert.deepEqual([...combinations([1, 2, 3], 1)], [[1], [2], [3]]);

    assert.deepEqual([...combinations([1, 2, 3, 4], 2)], [[1, 2], [1, 3], [2, 3], [1, 4], [2, 4], [3, 4]]);

    assert.deepEqual([...combinations([1, 2, 3, 4], 3)], [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]);

    assert.deepEqual([...combinations(range(1, 3), 3)], [[1, 2, 3]]);
});

export const samples = [
    () => combinations([1, 2, 3, 4], 2),
    () => combinations([1, 2, 3, 4], 3)
];


