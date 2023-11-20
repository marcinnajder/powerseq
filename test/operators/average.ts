import * as assert from "assert";
import { Enumerable, average } from "../../src/enumerable";

it('average', function () {
    assert.deepEqual(average([1, 2, 3, 4]), 2.5);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).average(), 2.5);
    assert.deepEqual(Enumerable.from([]).average(), undefined);
    assert.deepEqual(Enumerable.from(["a", "aa", "aaa"]).average(s => s.length), 2);

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

