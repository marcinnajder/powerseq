import * as assert from "assert";
import { Enumerable, some } from "../../src/index";

it('some', function () {
    assert.deepEqual(some([1, 2]), true);
    assert.deepEqual(Enumerable.from([1, 2]).some(), true);
    assert.deepEqual(Enumerable.from([]).some(), false);
    assert.deepEqual(Enumerable.from([1, 2]).some(x => x > 1), true);
});

export const linq = "Any";