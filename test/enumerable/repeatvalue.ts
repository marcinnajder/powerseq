import * as assert from "assert";
import { repeatvalue, take } from "../../src/index";


it('repeatvalue', function () {
    assert.deepEqual([...repeatvalue("a", 0)], []);
    assert.deepEqual([...repeatvalue("a", 3)], ["a", "a", "a"]);
    assert.deepEqual([...take(repeatvalue("a"), 5)], ["a", "a", "a", "a", "a"]);
});

export const samples = [
    () => repeatvalue(true, 4),
    () => take(repeatvalue(true), 2),
];

export const clojure = "repeat";