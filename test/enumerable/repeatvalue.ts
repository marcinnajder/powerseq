import * as assert from "assert";
import { Enumerable } from "../../src/index";

it('repeatvalue', function () {
    assert.deepEqual(Enumerable.repeatvalue("a", 0).toarray(), []);
    assert.deepEqual(Enumerable.repeatvalue("a", 3).toarray(), ["a", "a", "a"]);
    assert.deepEqual(Enumerable.repeatvalue("a").take(5).toarray(), ["a", "a", "a", "a", "a"]);
});