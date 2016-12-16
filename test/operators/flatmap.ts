import * as assert from "assert";
import { Enumerable, flatmap } from "../../src/index";

it('flatmap', function () {
    var items = [
        { name: "a", items: [] },
        { name: "b", items: [1] },
        { name: "c", items: [1, 2], },
    ];
    assert.deepEqual(Array.from(flatmap(items, x => x.items)), [1, 1, 2]);
    assert.deepEqual(Enumerable.from(items).flatmap(x => x.items).toarray(), [1, 1, 2]);
    assert.deepEqual(Enumerable.from(items).flatmap((x, index) => [index].concat(x.items)).toarray(), [0, 1, 1, 2, 1, 2]);
    assert.deepEqual(Enumerable.from(items).flatmap(x => x.items, (item, subitem) => item.name + subitem).toarray(), ["b1", "c1", "c2"]);
});

export const linq = "SelectMany";