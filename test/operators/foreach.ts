import * as assert from "assert";
import { foreach } from "../../src/index";

it('foreach', function () {
    let items: number[] = [];

    foreach([1, 2, 3], x => items.push(x));
    assert.deepEqual(items, [1, 2, 3]);

    items = [];
    foreach([1, 2, 3], (x, index) => items.push(x + index));
    assert.deepEqual(items, [1 + 0, 2 + 1, 3 + 2]);

    items = [];
    foreach((function* () {
        items.push(1);
        yield 1;
        items.push(2)
        yield 2;
    })()); // without action
    assert.deepEqual(items, [1, 2]);
});

export const samples = [
    () => foreach([1, 2, 3], x => { /* some action */; })
];

export const jsarray = "forEach";
export const lodash = ["each", "forEach"];
export const fsharp = ["iter", "iteri"];
export const kotlin = ["forEach", "forEachIndexed"];
export const java = "forEach";