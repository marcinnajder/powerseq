import * as assert from "assert";
import { toobject } from "../../src/index";

it('toobject', function () {
    for (const o1 of [
        toobject([1, 1, 2], x => x),
        toobject(x => x)([1, 1, 2])
    ]) {
        assert.equal(Object.keys(o1).length, 2);
        assert.strictEqual(o1[1], 1);
        assert.strictEqual(o1[2], 2);
    }

    const o2 = toobject([1, 1, 2], x => x, x => x.toString());
    assert.equal(Object.keys(o2).length, 2);
    assert.strictEqual(o2[1], "1");
    assert.strictEqual(o2[2], "2");

    const o3 = toobject(["a", "bb", "ccc"], x => x, (x, k) => k);
    assert.deepEqual(o3, { a: 'a', bb: 'bb', ccc: 'ccc' });

    assert.deepEqual(toobject(new Map([[1, "one"], [2, "two"]])), { "1": "one", "2": "two" });
});

export const samples = [
    () => toobject(['a', 'bb', 'ccc'], x => x.length),
    () => toobject(['a', 'bb', 'ccc'], x => x.length, x => x.toUpperCase()),
    () => toobject(['a', 'bb', 'ccc'], x => x.length, (x, k) => k),
    () => toobject(new Map([[1, "one"], [2, "two"]]))
];



export const lodash = ["fromPairs", "keyBy"];
export const kotlin = ["associate", "associateBy", "associateWith"];
export const java = "C.toMap";
