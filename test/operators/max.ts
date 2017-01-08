import * as assert from "assert";
import { Enumerable, max } from "../../src/index";

it('max', function () {
    assert.deepEqual(max([1, 2, 3, 1, 2, 3]), 3);
    assert.deepEqual(Enumerable.from([]).max(), undefined);
    assert.deepEqual(Enumerable.from([1]).max(), 1);
    assert.deepEqual(Enumerable.from([1, 2, 3, 1, 2, 3]).max(), 3);
    assert.deepEqual(Enumerable.from([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }]).max(x => x.id), 3);
});

export const samples = [
    () => max([1, 2, 3, 1]),
    () => max(['a', 'bb', 'rrr', 'd'], x => x.length)
];

export const linq = "Max";
export const lodash = "max";
export const rxjs = "max";
