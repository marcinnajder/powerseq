import * as assert from "assert";
import { Enumerable, elementat } from "../../src/index";

it('elementat', function () {
    assert.deepEqual(elementat([1, 2, 13, 123, 114, 5, 6], 3), 123);
    assert.deepEqual(Enumerable.from([0,1]).elementat(5), undefined);
    assert.deepEqual(Enumerable.from([0,1]).elementat(-5), undefined);
});

export const linq = "ElementAt";