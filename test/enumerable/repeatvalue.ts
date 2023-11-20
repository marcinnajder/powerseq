import * as assert from "assert";
import { Enumerable, repeatvalue, take } from "../../src/enumerable";

it('repeatvalue', function () {
    assert.deepEqual(Enumerable.repeatvalue("a", 0).toarray(), []);
    assert.deepEqual(Enumerable.repeatvalue("a", 3).toarray(), ["a", "a", "a"]);
    assert.deepEqual(Enumerable.repeatvalue("a").take(5).toarray(), ["a", "a", "a", "a", "a"]);
});

export const samples = [
    () => repeatvalue(true, 4),
    () => take(repeatvalue(true), 2),
];

export const clojure = "repeat";