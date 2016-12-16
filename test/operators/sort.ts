import * as assert from "assert";
import { Enumerable } from "../../src/index";

it('sort', function () {
    assert.deepEqual(Enumerable.from(["b", "c", "a"]).sort(x => x).toarray(), ["a", "b", "c"]);
    assert.deepEqual(Enumerable.from(["bbb", "c", "aa"]).sort(x => x.length).toarray(), ["c", "aa", "bbb"]);

    var [d1, d2, d3] = [new Date("2016-01-02"), new Date("2014-01-02"), new Date("2017-01-02")];
    assert.deepEqual(Enumerable.from([d1, d2, d3]).sort(x => x.getTime(), (a, b) => b - a).toarray(), [d3, d1, d2]); //comparer, descending
});

export const linq = "OrderBy";