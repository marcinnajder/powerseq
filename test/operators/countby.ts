import * as assert from "assert";
import { groupby, map, pipe, toarray, countby, toobject } from "../../src/index";

it('countby', function () {
    const items = ["a", "a", "cc", "ddd"];

    assert.deepEqual(toobject(countby(items, x => x.length)), { '1': 2, '2': 1, '3': 1 });
    assert.deepEqual(pipe(items, countby(x => x), toobject()), { 'a': 2, 'cc': 1, 'ddd': 1 });
});

export const samples = [
    () => countby(['a', 'a', 'cc', 'ddd', 'xx'], x => x.length),
    () => pipe(['a', 'a', 'cc', 'ddd', 'xx'], countby(x => x), toobject())
];


export const fsharp = "countBy";




