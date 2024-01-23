import * as assert from "assert";
import { groupby, map, pipe, toarray, toobject } from "../../src/index";

it('groupby', function () {
    const items = ["a", "b", "cc", "ddd"];

    assert.deepEqual([...groupby(items, x => x.length)].map(groupToString), ["1:a,b", "2:cc", "3:ddd"]);
    assert.deepEqual([...groupby(items, (x, index) => index % 2)].map(groupToString), ["0:a,cc", "1:b,ddd"]); // index
    assert.deepEqual([...groupby(items, x => x.length, x => x + x)].map(groupToString), ["1:aa,bb", "2:cccc", "3:dddddd"]); // elementSelector
    assert.deepEqual([...pipe(items, groupby(x => x.length), map(groupToString))], ["1:a,b", "2:cc", "3:ddd"]); // "resultSelector"

    assert.deepEqual([...pipe(items, groupby(x => x.length, (x, k) => k), map(groupToString))], ["1:1,1", "2:2", "3:3"]); // "resultSelector" with key

    assert.deepEqual(pipe(items, groupby(x => x.length, x => x + x), map(groupToString), toarray()), ["1:aa,bb", "2:cccc", "3:dddddd"]);

    assert.deepEqual([...groupby((x: string) => x.length)(items)].map(groupToString), ["1:a,b", "2:cc", "3:ddd"]);
});


function groupToString<K, V>([key, values]: [K, V]) {
    return key + ":" + (Array.isArray(values) ? values.join(",") : values);
}

export const samples = [
    () => groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length),
    () => groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x.toUpperCase()),
    () => groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, (x, k) => k),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), map(([key, values]) => ({ key, values }))),
    () => pipe(['a', 'b', 'cc', 'ddd', 'xx'], groupby(x => x.length), toobject())
];

export const linq = "GroupBy";
export const lodash = "groupBy";
export const rxjs = "groupBy";
export const fsharp = "groupBy";
export const kotlin = ["groupBy", "groupingBy"];
export const clojure = "group-by";
export const java = "C.groupingBy";




