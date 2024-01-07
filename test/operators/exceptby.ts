import * as assert from "assert";
import { exceptby } from "../../src/index";

it('exceptby', function () {
    assert.deepEqual([...exceptby([1, 2, 3, 4, 2, 4], [4, 6], x => x % 3)], [2]);
});

export const samples = [
    () => exceptby(['a', 'b', 'ba', 'xde'], ['poc'], x => x.length),
];

export const linq = "ExceptBy";
export const lodash = ["differenceBy", "differenceWith"];

