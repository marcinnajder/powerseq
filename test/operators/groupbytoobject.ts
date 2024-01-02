import * as assert from "assert";
import { groupbytoobject } from "../../src/index";

it('groupbytoobject', function () {
    const items = ["a", "b", "cc", "ddd"];

    assert.deepEqual(groupbytoobject(items, x => x.length), { '1': ['a', 'b'], '2': ['cc'], '3': ['ddd'] });
    assert.deepEqual(groupbytoobject(items, (x, index) => index % 2), { '0': ['a', 'cc'], '1': ['b', 'ddd'] }); // index
    assert.deepEqual(groupbytoobject(items, x => x.length, x => x + x), { '1': ['aa', 'bb'], '2': ['cccc'], '3': ['dddddd'] }); // elementSelector
    assert.deepEqual(groupbytoobject((x: string) => x.length)(items), { '1': ['a', 'b'], '2': ['cc'], '3': ['ddd'] });
});

export const samples = [
    () => groupbytoobject(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length),
    () => groupbytoobject(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x.toUpperCase())
];






