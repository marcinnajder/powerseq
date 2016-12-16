import * as assert from "assert";
import { Enumerable, findIndex } from "../../src/index";

it('findIndex', function () {
    assert.deepEqual(findIndex([1, 2], x => x > 0), 0);
    assert.deepEqual(Enumerable.from([1, 2]).findIndex(x => x > 0), 0);
    assert.deepEqual(Enumerable.from([1, 2]).findIndex(x => x > 1), 1);
    assert.deepEqual(Enumerable.from([1, 2]).findIndex(x => x > 2), undefined);
});