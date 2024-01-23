import * as assert from "assert";
import { pipe, groupbytoobject } from "../../src/index";

it('groupbytoobject', function () {
    const o0 = groupbytoobject(["a", "bb", "ccc", "e", "ff"], x => x.length);
    assert.deepEqual(o0, { 1: ["a", "e"], 2: ["bb", 'ff'], 3: ["ccc"] });

    const o1 = groupbytoobject(["a", "bb", "ccc", "e", "ff"], x => x.length, x => x.length);
    assert.deepEqual(o1, { 1: [1, 1], 2: [2, 2], 3: [3] });

    const o2 = groupbytoobject(["a", "bb", "ccc", "e", "ff"], x => x.length, (x, key) => x + key);
    assert.deepEqual(o2, { '1': ["a1", "e1"], '2': ["bb2", "ff2"], '3': ["ccc3"] })

    const o4 = pipe(["a", "bb", "ccc", "e", "ff"], groupbytoobject(x => x.length));
    assert.deepEqual(o4, { '1': ['a', 'e'], '2': ['bb', 'ff'], '3': ['ccc'] })
});

export const samples = [
    () => groupbytoobject(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length),
    () => groupbytoobject(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, x => x.toUpperCase()),
    () => groupbytoobject(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, x => x.length),
    () => groupbytoobject(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, (x, key) => x + key),
];


