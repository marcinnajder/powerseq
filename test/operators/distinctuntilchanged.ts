import * as assert from "assert";
import { distinctuntilchanged } from "../../src/index";

it('distinctuntilchanged', function () {
    assert.deepEqual([...distinctuntilchanged([1, 1, 2, 2, 2, 1, 2, 3, 3, 4, 2, 2])], [1, 2, 1, 2, 3, 4, 2]);
    assert.deepEqual([...distinctuntilchanged(["a", "aa", "ab", "ccc", "d", "e"], x => x.length)], ["a", "aa", "ccc", "d"]);

    assert.deepEqual([...distinctuntilchanged()([1, 1, 2, 2, 2, 1, 2, 3, 3, 4, 2, 2])], [1, 2, 1, 2, 3, 4, 2]);
});

export const samples = [
    () => distinctuntilchanged([1, 1, 2, 2, 2, 1, 3, 3]),
];

export const rxjs = ["distinctUntilChanged", "distinctUntilKeyChanged"];
export const clojure = "dedupe";