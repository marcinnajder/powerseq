import * as assert from "assert";
import { Enumerable, zip } from "../../src/index";

it('asiterable', function () {
    // type inferrence inside lambda expression is not workng without calling "asiterable"" method
    assert.deepEqual(Array.from(zip(["a", "b"], Enumerable.range(1, Number.MAX_VALUE).asiterable(), (s, n) => s + n)), ["a1", "b2"]);
});