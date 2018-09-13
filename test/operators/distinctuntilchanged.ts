import * as assert from "assert";
import { Enumerable, distinctuntilchanged } from "../../src/enumerable";

it('distinctuntilchanged', function () {
    assert.deepEqual(Array.from(distinctuntilchanged([1, 1, 2, 2, 2, 1, 2, 3, 3, 4, 2, 2])), [1, 2, 1, 2, 3, 4, 2]);
    assert.deepEqual(Enumerable.from(["a", "aa", "ab", "ccc", "d", "e"]).distinctuntilchanged(x => x.length).toarray(), ["a", "aa", "ccc", "d"]);
});

export const samples = [
    () => distinctuntilchanged([1, 1, 2, 2, 2, 1, 3, 3]),
];

export const rxjs = ["distinctUntilChanged", "distinctUntilKeyChanged"];