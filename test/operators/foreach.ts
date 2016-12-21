import * as assert from "assert";
import { Enumerable, foreach } from "../../src/index";

it('foreach', function () {
    var items: number[] = [];

    foreach([1, 2, 3], x => items.push(x));
    assert.deepEqual(items, [1, 2, 3]);

    items = [];
    Enumerable.from([1, 2, 3]).foreach((x, index) => items.push(x + index));
    assert.deepEqual(items, [1 + 0, 2 + 1, 3 + 2]);
});