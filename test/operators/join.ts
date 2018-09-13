import * as assert from "assert";
import { Enumerable, join } from "../../src/enumerable";

it('join', function () {
    var items1 = [{ id: 1, name: "one" }, { id: 2, name: "two" }, { id: 3, name: "three_" }, { id: 3, name: "three__" }];
    var items2 = [{ id: 1, value: "ONE" }, { id: 3, value: "THREE" }, { id: 4, value: "FOUR" }];

    var res = Enumerable.from(items1).join(items2, x => x.id, y => y.id, (x, y) => ({ name: x.name, value: y.value })).toarray();
    assert.deepEqual(res, [{ name: 'one', value: 'ONE' }, { name: 'three_', value: 'THREE' }, { name: 'three__', value: 'THREE' }])
});

export const linq = "Join";

export const samples = [
    () => join([1, 2, 3], ['a', 'bb', 'x'], x => x, y => y.length, (x, y) => x + ':' + y)
];