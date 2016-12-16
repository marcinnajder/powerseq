import * as assert from "assert";
import { Enumerable } from "../../src/index";

it('empty', function () {
    var result = Enumerable.empty<number>();
    assert.deepEqual(result.toarray(), []);
});
