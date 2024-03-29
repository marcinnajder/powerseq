import * as assert from "assert";
import { tomap } from "../../src/index";

it('tomap', function () {
    for (const m1 of [
        tomap([1, 1, 2], x => x),
        tomap<number, number>(x => x)([1, 1, 2])
    ]) {
        assert.equal(m1.size, 2);
        assert.strictEqual(m1.get(1), 1);
        assert.strictEqual(m1.get(2), 2);
    }

    const m2 = tomap([1, 1, 2], x => x, x => x.toString());
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