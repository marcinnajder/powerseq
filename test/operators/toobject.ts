import * as assert from "assert";
import { Enumerable, toobject } from "../../src/index";

it('toobject', function () {
    var o1 = toobject([1, 1, 2], x => x);
    assert.equal(Object.keys(o1).length, 2);
    assert.strictEqual(o1[1], 1);
    assert.strictEqual(o1[2], 2);

    var o2 = Enumerable.from([1, 1, 2]).toobject(x => x, x => x.toString());
    assert.equal(Object.keys(o2).length, 2);
    assert.strictEqual(o2[1], "1");
    assert.strictEqual(o2[2], "2");
});

export const samples = [
    () => toobject(['a', 'bb', 'ccc'], x => x.length),
    () => toobject(['a', 'bb', 'ccc'], x => x.length, x => x.toUpperCase())
];