import * as assert from "assert";
import { Enumerable, sum } from "../../src/index";

it('sum', function () {
    assert.deepEqual(sum([1, 2, 3, 4]), 10);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).sum(), 10);
    assert.deepEqual(Enumerable.from([]).sum(), 0);
    assert.deepEqual(Enumerable.from(["a", "aa", "aaa"]).sum(s => s.length), 6);
});

export const linq = "Sum";