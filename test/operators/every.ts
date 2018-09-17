import * as assert from "assert";
import { Enumerable, every } from "../../src/enumerable";

it('every', function () {
    assert.deepEqual(every([1, 2], x => x > 0), true);
    assert.deepEqual(Enumerable.from([1, 2]).every(x => x > 0), true);
    assert.deepEqual(Enumerable.from([1, 2]).every(x => x > 1), false);

    assert.deepEqual(every(x => x > 0)([1, 2]), true);
});



export const samples = [
    () => every([1, 2, 12, 15], x => x > 0),
    () => every([1, 2, 12, 15], x => x < 10),
];

export const linq = "All";
export const jsarray = "every";
export const lodash = "every";
export const rxjs = "every";
export const fsharp = "forall";