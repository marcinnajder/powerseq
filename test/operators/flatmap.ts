import * as assert from "assert";
import { flatmap } from "../../src/index";

it('flatmap', function () {
    var items = [
        { name: "a", items: [] },
        { name: "b", items: [1] },
        { name: "c", items: [1, 2], },
    ];
    type ItemType = typeof items[0];
    assert.deepEqual([...flatmap(items, x => x.items)], [1, 1, 2]);
    assert.deepEqual([...flatmap(items, x => x.items)], [1, 1, 2]);
    assert.deepEqual([...flatmap(items, (x, index) => [index].concat(x.items))], [0, 1, 1, 2, 1, 2]);
    assert.deepEqual([...flatmap(items, x => x.items, (item, subitem) => item.name + subitem)], ["b1", "c1", "c2"]);

    assert.deepEqual([...flatmap<ItemType, number>(x => x.items)(items)], [1, 1, 2]);
});

export const samples = [
    () => flatmap([{ ns: [1] }, { ns: [99, 10] }, { ns: [6, 3] }], x => x.ns),
    () => flatmap(['abc', 'cd'], text => text, (text, char) => text + '-' + char)
];


export const linq = "SelectMany";
export const lodash = ["flatten", "flatMap"];
export const fsharp = "collect";
export const kotlin = ["flatMap", "flatten~"];
export const clojure = ["mapcat", "flatten~"];
export const java = ["flatMap", "mapMulti"];

