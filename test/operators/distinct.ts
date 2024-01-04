import * as assert from "assert";
import { distinct } from "../../src/index";

it('distinct', function () {
    assert.deepEqual([...distinct([1, 2, 3, 4, 2, 4])], [1, 2, 3, 4]);
    assert.deepEqual([...distinct([1, 2, 3, 4, 5, 6], x => x % 3)], [1, 2, 0]);
    assert.deepEqual([...distinct(['a', 'aa', 'ab', 'abc'], x => x.length)], [1, 2, 3]);

    assert.deepEqual([...distinct()([1, 2, 3, 4, 2, 4])], [1, 2, 3, 4]);
});

export const samples = [
    () => distinct([1, 2, 1, 3, 2]),
    () => distinct(['a', 'aa', 'ab', 'abc'], x => x.length)
];


export const linq = "Distinct";
export const lodash = ["uniq", "uniqWith"];
export const rxjs = "distinct";
export const fsharp = "distinct";
export const kotlin = "distinct";
export const clojure = "distinct";
export const java = "distinct";


