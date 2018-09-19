import * as assert from "assert";
import { Enumerable, minby } from "../../src/enumerable";

it('minby', function () {
    var items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }];
    assert.deepEqual(minby(items, x => x.id), { id: 1 });
    assert.deepEqual(Enumerable.from(items).minby(x => x.id), { id: 1 });
    assert.deepEqual(Enumerable.from([]).minby(x => x), undefined);

    // type ItemType = typeof items[0];
    // assert.deepEqual(minby<ItemType>(x => x.id)(items), { id: 1 });
});

export const samples = [
    () => minby(['a', 'bb', 'rrr', 'd'], x => x.length)
];

export const lodash = "minBy";
export const fsharp = "minBy";