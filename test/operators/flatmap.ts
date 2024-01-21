import * as assert from "assert";
import { flatmap } from "../../src/index";

it('flatmap', function () {
    const items = [
        { name: "a", items: [] },
        { name: "b", items: [1] },
        { name: "c", items: [1, 2], },
    ];

    assert.deepEqual([...flatmap(items, x => x.items)], [1, 1, 2]);
    assert.deepEqual([...flatmap(items, x => x.items)], [1, 1, 2]);
    assert.deepEqual([...flatmap(items, (x, index) => [index].concat(x.items))], [0, 1, 1, 2, 1, 2]);
    assert.deepEqual([...flatmap(items, x => x.items, (item, subitem) => item.name + subitem)], ["b1", "c1", "c2"]);

    assert.deepEqual([...flatmap<typeof items[0], number>(x => x.items)(items)], [1, 1, 2]);
});

export const samples = [
    () => flatmap([{ ns: [1] }, { ns: [99, 10] }, { ns: [6, 3] }], x => x.ns),
    () => flatmap([{ ns: [1] }, { ns: [99, 10] }, { ns: [6, 3] }], (x, index) => x.ns.map(n => [index, n])),
    () => flatmap(['abc', 'cd'], text => text, (text, char, index) => `${index}. ${char} (${text})`)
];

export const jsarray = "flatMap";
export const linq = "SelectMany";
export const lodash = "flatMap";
export const fsharp = "collect";
export const kotlin = "flatMap";
export const clojure = "mapcat";
export const java = ["flatMap", "mapMulti"];

