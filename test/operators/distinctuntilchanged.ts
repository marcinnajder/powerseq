import * as assert from "assert";
import { Enumerable, distinctuntilchanged } from "../../src/index";

it('distinctuntilchanged', function () {
    assert.deepEqual(Array.from(distinctuntilchanged([1, 1, 2, 2, 2, 1, 2, 3, 3, 4, 2, 2])), [1, 2, 1, 2, 3, 4, 2]);
    assert.deepEqual(Enumerable.from(["a", "aa", "ab", "ccc", "d", "e"]).distinctuntilchanged(x => x.length).toarray(), ["a", "aa", "ccc", "d"]);
});
