import * as assert from "assert";
import { Enumerable, concat} from "../../src/index";

it('concat', function () {
    assert.deepEqual(Array.from(concat([1, 2, 3], [4, 5], [6, 7])), [1, 2, 3, 4, 5, 6, 7]);
    assert.deepEqual(Enumerable.from([1, 2, 3]).concat().toarray(), [1, 2, 3]);
    assert.deepEqual(Enumerable.from([1, 2, 3]).concat([4, 5], [6, 7]).toarray(), [1, 2, 3, 4, 5, 6, 7]);
});

export const linq = "Concat";
