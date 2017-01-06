import * as assert from "assert";
import { Enumerable, expand, take } from "../../src/index";

it('expand', function () {
    assert.deepEqual(Array.from(expand([1], x => x > 8 ? [] : [x * 2])), [1, 2, 4, 8, 16]);

    var tree = [{
        name: "a",
        children: [
            { name: "d", children: [{ name: "dd", children: [] }] },
            { name: "w", children: [] }
        ]
    },
    { name: "x", children: [] }];

    assert.deepEqual(Enumerable.from(tree).expand(x => x.children).map(x => x.name).toarray(), ["a", "x", "d", "w", "dd"]);
});

export const samples = [
    () => expand([1], x => x > 8 ? [] : [10, x * 2])
];