import * as assert from "assert";
import { Enumerable, min } from "../../src/index";

it('min', function () {
    assert.deepEqual(min([1, 2, 3, 1, 2, 3]), 1);
    assert.deepEqual(Enumerable.from([]).min(), undefined);
    assert.deepEqual(Enumerable.from([1]).min(), 1);
    assert.deepEqual(Enumerable.from([1, 2, 3, 1, 2, 3]).min(), 1);
    assert.deepEqual(Enumerable.from([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }]).min(x => x.id), 1 );
});

export const linq = "Min";