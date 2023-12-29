import * as assert from "assert";
import { defer } from "../../src/index";

it('defer', function () {
    var couter = 0;

    var iterable = defer(() => {
        couter++;
        return [couter, couter, couter];
    });

    assert.deepEqual(Array.from(iterable), [1, 1, 1]);
    assert.deepEqual(couter, 1);
    assert.deepEqual(Array.from(iterable), [2, 2, 2]);
    assert.deepEqual(couter, 2);
});


export const samples = [
    () => defer(() => [1, 2, 3] /* executed on demand */)
];

export const rxjs = "defer";
export const fsharp = "delay";