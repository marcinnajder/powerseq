import * as assert from "assert";
import { Enumerable } from "../../src/index";

it('entries', function () {
    assert.deepEqual(Enumerable.entries<number>({ "a": 123, "b": 123123 }).toarray(), [["a", 123], ["b", 123123]]);
});