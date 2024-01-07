import * as assert from "assert";
import { unionby } from "../../src/index";

it('unionby', function () {
    assert.deepEqual([...unionby([4, 1, 1, 2, 4], [1, 2, 3, 4, 5, 6], x => x % 3)], [4, 2, 3]);

});

export const samples = [
    () => unionby(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)
];

export const linq = "UnionBy";
export const lodash = ["unionBy", "unionWith"];
