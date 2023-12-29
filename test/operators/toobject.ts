import * as assert from "assert";
import { toobject } from "../../src/index";

it('toobject', function () {
    for (var o1 of [
        toobject([1, 1, 2], x => x),
        toobject(x => x)([1, 1, 2])
    ]) {
        assert.equal(Object.keys(o1).length, 2);
        assert.strictEqual(o1[1], 1);
        assert.strictEqual(o1[2], 2);
    }

    var o2 = toobject([1, 1, 2], x => x, x => x.toString());
    assert.equal(Object.keys(o2).length, 2);
    assert.strictEqual(o2[1], "1");
    assert.strictEqual(o2[2], "2");
});

export const samples = [
    () => toobject(['a', 'bb', 'ccc'], x => x.length),
    () => toobject(['a', 'bb', 'ccc'], x => x.length, x => x.toUpperCase())
];

export const lodash = ["fromPairs", "keyBy"];
export const kotlin = ["associate", "associateBy", "associateWith"];
export const java = "C.toMap";
