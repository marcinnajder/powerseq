import * as assert from "assert";
import { pipe, groupbytotransformedobject } from "../../src/index";

it('groupbytotransformedobject', function () {
    const o0 = groupbytotransformedobject(["a", "bb", "ccc", "e", "ff"], x => x.length, xs => xs);
    assert.deepEqual(o0, { 1: ["a", "e"], 2: ["bb", 'ff'], 3: ["ccc"] });

    const o1 = groupbytotransformedobject(["a", "bb", "ccc", "e", "ff"], x => x.length, xs => xs.length);
    assert.deepEqual(o1, { 1: 2, 2: 2, 3: 1 });

    const o2 = groupbytotransformedobject(["a", "bb", "ccc", "e", "ff"], x => x.length, (xs, key) => xs.map(x => x + key));
    assert.deepEqual(o2, { '1': ["a1", "e1"], '2': ["bb2", "ff2"], '3': ["ccc3"] })

    const o4 = pipe(["a", "bb", "ccc", "e", "ff"], groupbytotransformedobject(x => x.length, xs => xs[0]));
    assert.deepEqual(o4, { '1': 'a', '2': 'bb', '3': 'ccc' })
});

export const samples = [
    () => groupbytotransformedobject(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, xs => xs.join(",")),
    () => groupbytotransformedobject(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, xs => xs.length)
];


