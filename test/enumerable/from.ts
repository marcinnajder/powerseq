import * as assert from "assert";
import { from } from "../../src/index";
import { return123Iterator, } from "../common";

it('from', function () {
    assert.deepEqual([...from(return123Iterator())], [1, 2, 3]);
    assert.deepEqual([...from([1, 2, 3])], [1, 2, 3]);
});

export const samples = [
    () => from([1, 2, 3]),
    () => from((function* () { yield 1; })())
];


export const jsarray = "from";
export const rxjs = "from";