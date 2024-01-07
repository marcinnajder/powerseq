import * as assert from "assert";
import { except } from "../../src/index";

it('except', function () {
    assert.deepEqual([...except([1, 2, 3, 4, 2, 4], [4, 5, 6, 1])], [2, 3]);
    assert.deepEqual([...except([4, 5, 6, 1])([1, 2, 3, 4, 2, 4])], [2, 3]);
});

export const samples = [
    () => except([1, 2, 2, 3, 4], [2, 3]),
];

export const linq = "Except";
export const lodash = ["difference", "without"];
export const kotlin = "minus~";
export const clojure = "difference~";

