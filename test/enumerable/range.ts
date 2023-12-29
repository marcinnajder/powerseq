import * as assert from "assert";
import { range } from "../../src/index";


it('range', function () {
    assert.deepEqual([...range(0, 4)], [0, 1, 2, 3]);
    assert.deepEqual([...range(-2, 4)], [-2, -1, 0, 1]);
    assert.deepEqual([...range(0, -2)], []);
});

export const samples = [
    () => range(10, 4)
];

export const linq = "Range";
export const lodash = "range";
export const rxjs = "range";
export const clojure = "range";
