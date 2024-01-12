import * as assert from "assert";
import { pipe, toobjectgrouping } from "../../src/index";

it('toobjectgrouping', function () {
    const o1 = toobjectgrouping(["a", "bb", "ccc", "e", "ff"], x => x.length, xs => xs.join(","));
    assert.deepEqual(o1, { '1': 'a,e', '2': 'bb,ff', '3': 'ccc' })

    const o2 = toobjectgrouping(["a", "bb", "ccc", "e", "ff"], x => x.length, (xs, key) => xs.map(_ => key));
    assert.deepEqual(o2, { '1': [1, 1], '2': [2, 2], '3': [3] })

    const o3 = toobjectgrouping(["a", "bb", "ccc", "e", "ff"], x => x.length);
    assert.deepEqual(o3, { '1': ['a', 'e'], '2': ['bb', 'ff'], '3': ['ccc'] })

    const o4 = pipe(["a", "bb", "ccc", "e", "ff"], toobjectgrouping(x => x.length));
    assert.deepEqual(o4, { '1': ['a', 'e'], '2': ['bb', 'ff'], '3': ['ccc'] })
});

export const samples = [
    () => toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length),
    () => toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, xs => xs.join(',')),
    () => toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, xs => xs.length),
    () => toobjectgrouping(['a', 'bb', 'ccc', 'e', 'ff'], x => x.length, (xs, key) => xs.map(_ => key)),
];


