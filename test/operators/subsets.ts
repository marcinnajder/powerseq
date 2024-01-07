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





    //assert.deepEqual([...partitionby([1], isEven)], [[1]]);
    // assert.deepEqual([...partitionby([1, 2, 3, 4], isEven)], [[1], [2], [3], [4]]);
    // assert.deepEqual([...partitionby([1, 2, 4, 6, 3, 4], isEven)], [[1], [2, 4, 6], [3], [4]]);

    // assert.deepEqual([...pipe([1, 2, 3, 4], partitionby(n => n % 2 === 0))], [[1], [2], [3], [4]]);
});

// sequenceOf(0, 1, 2, 3).allUniqueTuples(2).map { it.toSequence().toList() }.toList() eq
// listOf(listOf(1, 0), listOf(2, 0), listOf(2, 1), listOf(3, 0), listOf(3, 1), listOf(3, 2))

// sequenceOf(0, 1, 2, 3).allUniqueTuples(3).map { it.toSequence().toList() }.toList() eq
// listOf(listOf(2, 1, 0), listOf(3, 1, 0), listOf(3, 2, 1), listOf(3, 2, 0))



// export const samples = [
//     () => partitionby([1, 2, 4, 6, 3, 4], n => n % 2 === 0)
// ];


