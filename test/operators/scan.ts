import * as assert from "assert";
import { Enumerable, scan } from "../../src/index";

it('scan', function () {
    assert.deepEqual(Array.from(scan([1, 2, 3], (p, c) => p + c)), [1 + 2, 3 + 3]);
    assert.deepEqual(Enumerable.from([1, 2, 3]).scan((p, c) => p + c).toarray(), [1 + 2, 3 + 3]);
    assert.deepEqual(Enumerable.from([1, 2, 3]).scan((p, c) => p + c, "").toarray(), ["" + 1, "1" + "2", "12" + "3"]);
    assert.deepEqual(Enumerable.from<number>([]).scan((p, c) => p + c).toarray(), []);
    assert.deepEqual(Enumerable.from<number>([1]).scan((p, c) => p + c).toarray(), []);
    assert.deepEqual(Enumerable.from<number>([]).scan((p, c) => p + c, "").toarray(), []);
    assert.deepEqual(Enumerable.from<number>([1]).scan((p, c) => p + c, "").toarray(), ["" + 1]);
});

export const samples = [
    () => scan([1, 2, 3], (a, x) => a + x),
    () => scan([1, 2, 3], (a, x) => a + (x * 10), '')
];

export const rxjs = "scan";
export const fsharp = "scan";