import * as assert from "assert";
import { EnumerableGroup, groupby } from "../../src/enumerable";
import { Enumerable } from "../../src/enumerable_";

it('groupby', function () {
    var items = Enumerable.from(["a", "b", "cc", "ddd"]);
    assert.deepEqual(items.groupby(x => x.length).map(groupToString).toarray(), ["1:a,b", "2:cc", "3:ddd"]);
    assert.deepEqual(items.groupby((x, index) => index % 2).map(groupToString).toarray(), ["0:a,cc", "1:b,ddd"]);
    assert.deepEqual(items.groupby(x => x.length, x => x + x).map(groupToString).toarray(), ["1:aa,bb", "2:cccc", "3:dddddd"]); // using elementSelector
    // assert.deepEqual(items.groupby(x => x.length, (key: number, items: Enumerable<string>) => key + ":" + Array.from(items).join(",")).toarray(), ["1:a,b", "2:cc", "3:ddd"]); // using resultSelector

    // assert.deepEqual(items.groupby(
    //     x => x.length,                                                  //  keySelector     : (x:string) => number
    //     x => x + x,                                                     //  elementSelector : (x:string) => string
    //     (key, items) => key + ":" + items.toarray().join(",")           //  resultSelector  : (key:number, items:Enumerable<string>) => string
    // ).toarray(), ["1:aa,bb", "2:cccc", "3:dddddd"]);
});


function groupToString<TKey, TElement>(group: EnumerableGroup<TKey, TElement>) {
    return group.key + ":" + Array.from<TElement>(group).join(",")
}

export const samples = [
    () => groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length),
    () => groupby(['a', 'b', 'cc', 'ddd', 'xx'], x => x.length, x => x.toUpperCase())
];

export const linq = "GroupBy";
export const lodash = "groupBy";
export const rxjs = "groupBy";
export const fsharp = "groupBy";


