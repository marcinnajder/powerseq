import * as assert from "assert";
import { scan } from "../../src/index";

it('scan', function () {
    assert.deepEqual([...scan([1, 2, 3], (p, c) => p + c)], [1 + 2, 3 + 3]);

    assert.deepEqual([...scan([1, 2, 3], (p, c) => p + c, "")], ["", "" + 1, "1" + "2", "12" + "3"]);


    assert.deepEqual([...scan([], (p: number, c: number) => p + c)], []);
    assert.deepEqual([...scan([1], (p, c) => p + c)], []);
    assert.deepEqual([...scan([], (p, c) => p + c, "")], [""]);
    assert.deepEqual([...scan([1], (p, c) => p + c, "")], ["", "" + 1]);

    assert.deepEqual([...scan<number>((p, c) => p + c)([1, 2, 3])], [1 + 2, 3 + 3]);
});

export const samples = [
    () => scan([1, 2, 3], (a, x) => a + x),
    () => scan([1, 2, 3], (a, x) => a + (x * 10), '')
];

export const rxjs = "scan";
export const fsharp = "scan";
export const kotlin = ["scan", "runningFold", "runningReduce"];
export const clojure = "reductions";
