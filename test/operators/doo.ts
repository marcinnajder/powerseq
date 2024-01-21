import * as assert from "assert";
import { doo } from "../../src/index";

it('doo', function () {
    const items: number[] = [];

    assert.deepEqual([...doo([1, 2, 3], (x, index) => items.push(x + index))], [1, 2, 3]);

    assert.deepEqual(items, [1 + 0, 2 + 1, 3 + 2]);
});

export const samples = [
    () => doo([1, 2, 3,], x => { /* executed during iteration */ }),
];

export const rxjs = "do";
export const kotlin = "onEach";
export const java = "peek";

