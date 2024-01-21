import * as assert from "assert";
import { minby } from "../../src/index";

it('minby', function () {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }];
    assert.deepEqual(minby(items, x => x.id), { id: 1 });
    assert.deepEqual(minby([], x => x), undefined);
});

export const samples = [
    () => minby(['a', 'bb', 'rrr', 'd'], x => x.length),
    () => minby(['a', 'bb', 'rrr', 'd'], (x, index) => x.length * index)
];

export const linq = "MinBy";
export const lodash = "minBy";
export const fsharp = "minBy";
export const kotlin = "minBy";
export const clojure = "min-key";
export const java = ["C.minBy", "C.summarizing*"];