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

export const samples = [
    () => flatmap([{ ns: [1] }, { ns: [99, 10] }, { ns: [6, 3] }], x => x.ns),
    () => flatmap(['abc', 'cd'], text => text, (text, char) => text + '-' + char)
];


export const linq = "SelectMany";
export const lodash = ["flatten", "flatMap"];
export const fsharp = "collect";

