import * as assert from "assert";
import { distinctby } from "../../src/index";

it('distinctby', function () {

    assert.deepEqual([...distinctby([1, 2, 3, 4, 5, 6], x => x % 3)], [1, 2, 3]);
    assert.deepEqual([...distinctby([1, 2, 3, 4, 5, 6].reverse(), x => x % 3)], [6, 5, 4]);

    assert.deepEqual([...distinctby(['a', 'aa', 'ab', 'abc'], x => x.length)], ["a", "aa", "abc"]);

    assert.deepEqual([...distinctby((x: number) => x)([1, 2, 3, 4, 2, 4])], [1, 2, 3, 4]);
});

export const samples = [
    () => distinctby(['a', 'aa', 'ab', 'abc'], x => x.length)
];

export const linq = "DistinctBy";
export const lodash = ["uniqBy"];
export const fsharp = ["distinctBy"];
export const kotlin = ["distinctBy"];



