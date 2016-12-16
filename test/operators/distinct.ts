import * as assert from "assert";
import { Enumerable, distinct } from "../../src/index";

it('distinct', function () {
    assert.deepEqual(Array.from(distinct([1, 2, 3, 4, 2, 4])), [1, 2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 2, 4]).distinct().toarray(), [1, 2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 2, 4]).distinct(x => x % 3).toarray(), [1, 2, 3]);
});

export const linq = "Distinct";