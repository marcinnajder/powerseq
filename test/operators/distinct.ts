import * as assert from "assert";
import { Enumerable, distinct } from "../../src/index";

it('distinct', function () {
    assert.deepEqual(Array.from(distinct([1, 2, 3, 4, 2, 4])), [1, 2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 2, 4]).distinct().toarray(), [1, 2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 2, 4]).distinct(x => x % 3).toarray(), [1, 2, 3]);
});

export const samples = [
    () => distinct([1, 2, 1, 3, 2]),
    () => distinct(['a', 'aa', 'ab', 'abc'], x => x.length)
];

export const linq = "Distinct";
export const lodash = ["uniq", "uniqBy", "uniqWith"];
export const rxjs = "distinct";
export const fsharp = ["distinct", "distinctBy"];



