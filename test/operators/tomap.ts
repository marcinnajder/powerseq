import * as assert from "assert";
import { Enumerable, tomap } from "../../src/enumerable";

it('tomap', function () {
    for (var m1 of [
        tomap([1, 1, 2], x => x),
        tomap<number, number>(x => x)([1, 1, 2])
    ]) {
        assert.equal(m1.size, 2);
        assert.strictEqual(m1.get(1), 1);
        assert.strictEqual(m1.get(2), 2);
    }

    var m2 = Enumerable.from([1, 1, 2]).tomap(x => x, x => x.toString());
    assert.equal(m2.size, 2);
    assert.strictEqual(m2.get(1), "1");
    assert.strictEqual(m2.get(2), "2");
});

export const samples = [
    () => tomap(['a', 'bb', 'ccc'], x => x.length),
    () => tomap(['a', 'bb', 'ccc'], x => x.length, x => x.toUpperCase())
];

export const linq = "ToDictionary";
export const kotlin = "toMap";
export const java = "C.toMap";