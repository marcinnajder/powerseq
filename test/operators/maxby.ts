import * as assert from "assert";
import { Enumerable, maxby } from "../../src/enumerable";

it('maxby', function () {
    var items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }];
    type ItemType = typeof items[0];
    assert.deepEqual(maxby(items, x => x.id), { id: 3 });
    assert.deepEqual(Enumerable.from(items).maxby(x => x.id), { id: 3 });
    assert.deepEqual(Enumerable.from([]).maxby(x => x), undefined);

    assert.deepEqual(maxby<ItemType>(x => x.id)(items), { id: 3 });
});

export const samples = [
    () => maxby(['a', 'bb', 'rrr', 'd'], x => x.length)
];

export const lodash = "maxBy";
export const fsharp = "maxBy";