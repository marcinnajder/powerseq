import * as assert from "assert";
import { Enumerable, foreach } from "../../src/index";

it('foreach', function () {
    var items: number[] = [];

    foreach([1, 2, 3], x => items.push(x));
    assert.deepEqual(items, [1, 2, 3]);

    items = [];
    Enumerable.from([1, 2, 3]).foreach((x, index) => items.push(x + index));
    assert.deepEqual(items, [1 + 0, 2 + 1, 3 + 2]);

    items = [];
    Enumerable.from((function* () {
        items.push(1);
        yield 1;
        items.push(2)
        yield 2;
    })())
        .foreach(); // without action
    assert.deepEqual(items, [1, 2]);
});

export const samples = [
    () => foreach([1, 2, 3], x => { /* some action */; })
];

export const jsarray = "forEach";