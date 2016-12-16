import * as assert from "assert";
import { Enumerable, find } from "../../src/index";

it('find', function () {
    assert.deepEqual(find([1, 2]), 1);
    assert.deepEqual(Enumerable.from([]).find(), undefined);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).find(x => x > 2), 3);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).find(x => x > 4), undefined);
});

export const linq = "First";