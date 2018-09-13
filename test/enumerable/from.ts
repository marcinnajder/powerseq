import * as assert from "assert";
import { Enumerable } from "../../src/enumerable";
import { return123Iterator, } from "../common";

it('from', function () {
    assert.deepEqual(Enumerable.from(return123Iterator()).toarray(), [1, 2, 3]);
    assert.deepEqual(Enumerable.from([1, 2, 3]).toarray(), [1, 2, 3]);
});

export const samples = [
    () => Enumerable.from([1, 2, 3]),
    () => Enumerable.from((function* () { yield 1; })())
];


export const jsarray = "from";
export const rxjs = "from";