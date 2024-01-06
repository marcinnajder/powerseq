import * as assert from "assert";
import { partitionby, pipe } from "../../src/index";

it('partitionby', function () {
    assert.deepEqual([...partitionby([], isEven)], []);
    assert.deepEqual([...partitionby([1], isEven)], [[1]]);
    assert.deepEqual([...partitionby([1, 2, 3, 4], isEven)], [[1], [2], [3], [4]]);
    assert.deepEqual([...partitionby([1, 2, 4, 6, 3, 4], isEven)], [[1], [2, 4, 6], [3], [4]]);

    assert.deepEqual([...pipe([1, 2, 3, 4], partitionby(n => n % 2 === 0))], [[1], [2], [3], [4]]);
});

function isEven(n: number) {
    return n % 2 === 0;
}
export const samples = [
    () => partitionby([1, 2, 4, 6, 3, 4], n => n % 2 === 0)
];

export const clojure = "partition-by";
