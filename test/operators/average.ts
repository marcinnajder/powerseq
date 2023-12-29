import * as assert from "assert";
import { average } from "../../src/index";

it('average', function () {
    assert.deepEqual(average([1, 2, 3, 4]), 2.5);
    assert.deepEqual(average([]), undefined);
    assert.deepEqual(average(["a", "aa", "aaa"], s => s.length), 2);

    assert.deepEqual(average<number>()([1, 2, 3, 4]), 2.5);
    assert.deepEqual(average<string>(s => s.length)(["a", "aa", "aaa"]), 2);
});

export const samples = [
    () => average([1, 2, 3, 4]),
    () => average(['a', 'aa', 'aaa'], s => s.length)
];

export const linq = "Average";
export const lodash = ["mean", "meanBy"];
export const fsharp = ["average", "averageBy"];
export const kotlin = "average";
export const java = ["C.averaging*", "C.summarizing*"];

