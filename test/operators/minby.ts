import * as assert from "assert";
import { Enumerable, minby } from "../../src/index";

it('minby', function () {
    var items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }];
    assert.deepEqual(minby(items, x => x.id), { id: 1 });
    assert.deepEqual(Enumerable.from(items).minby(x => x.id), { id: 1 });
    assert.deepEqual(Enumerable.from([]).minby(x => x), undefined);
});

export const samples = [
    () => minby(['a', 'bb', 'rrr', 'd'], x => x.length)
];

export const lodash = "minBy";