import * as assert from "assert";
import { Enumerable } from "../../src/index";

it('groupjoin', function () {
    var items1 = [{ id: 1, name: "one" }, { id: 2, name: "two" }, { id: 3, name: "three_" }, { id: 3, name: "three__" }];
    var items2 = [{ id: 1, value: "ONE" }, { id: 3, value: "THREE" }, { id: 4, value: "FOUR" }];

    var res = Enumerable.from(items2).groupjoin(
        items1, 
        x => x.id, 
        y => y.id, 
        (x, y) => ({name:x.value, items: y.map(x=>x.name).toarray().join(",")})  
    ).toarray();

    assert.deepEqual(res, [{ name: 'ONE', items: 'one' }, { name: 'THREE', items: 'three_,three__' }])
});

export const linq = "GroupJoin";