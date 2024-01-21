import * as assert from "assert";
import { sum } from "../../src/index";

it('sum', function () {
    assert.equal(sum([1, 2, 3, 4]), 10);
    assert.equal(sum([]), 0);
    assert.equal(sum(["a", "aa", "aaa"], s => s.length), 6);
    assert.equal(sum(["a", "aa", "aaa"], (s, index) => s.length + index), 1 + 2 + 3 + 1 + 2);
    assert.equal(sum()([1, 2, 3, 4]), 10);
});

export const samples = [
    () => sum([1, 2, 3]),
    () => sum(['a', 'asd', 'yy'], x => x.length),
    () => sum(['a', 'asd', 'yy'], (x, index) => x.length + index)
];

export const linq = "Sum";
export const lodash = ["sum", "sumBy"];
export const fsharp = ["sum", "sumBy"];
export const kotlin = ["sum", "sumOf"];
export const java = ["C.summing*", "C.summarizing*"];