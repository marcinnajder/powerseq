import * as assert from "assert";
import { maxby } from "../../src/index";

it('maxby', function () {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }];
    type ItemType = typeof items[0];
    assert.deepEqual(maxby(items, x => x.id), { id: 3 });
    assert.deepEqual(maxby([], x => x), undefined);
    assert.deepEqual(maxby((x: ItemType) => x.id)(items), { id: 3 });
});

export const samples = [
    () => maxby(['a', 'bb', 'rrr', 'd'], x => x.length),
    () => maxby(['a', 'bb', 'rrr', 'd'], (x, index) => x.length * index)
];

export const linq = "MaxBy";
export const lodash = "maxBy";
export const fsharp = "maxBy";
export const kotlin = "maxBy";
export const clojure = "max-key";
export const java = ["C.maxBy", "C.summarizing*"];