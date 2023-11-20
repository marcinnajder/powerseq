import * as assert from "assert";
import { Enumerable, sum } from "../../src/enumerable";

it('sum', function () {
    assert.deepEqual(sum([1, 2, 3, 4]), 10);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).sum(), 10);
    assert.deepEqual(Enumerable.from([]).sum(), 0);
    assert.deepEqual(Enumerable.from(["a", "aa", "aaa"]).sum(s => s.length), 6);

    assert.deepEqual(sum()([1, 2, 3, 4]), 10);
});

export const samples = [
    () => sum([1, 2, 3]),
    () => sum(['a', 'asd', 'yy'], x => x.length)
];

export const linq = "Sum";
export const lodash = ["sum", "sumBy"];
export const fsharp = ["sum", "sumBy"];
export const kotlin = ["sum", "sumOf"];
export const java = ["C.summing*", "C.summarizing*"];