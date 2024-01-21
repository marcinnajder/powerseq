import * as assert from "assert";
import { groupjoin, pipe } from "../../src/index";

it('groupjoin', function () {
    const items1 = [{ id: 1, name: "one" }, { id: 2, name: "two" }, { id: 3, name: "three!" }, { id: 3, name: "three!!" }];
    const items2 = [{ id: 1, value: "ONE" }, { id: 1, value: "ONE!" }, { id: 3, value: "THREE" }, { id: 4, value: "FOUR" }];

    const res1 = [...groupjoin(
        items1,
        items2,
        x => x.id,
        y => y.id,
        (item1, items2) => ({ name: item1.name, items: items2.map(x => x.value).join() })
    )];

    const res2 = [...pipe(items1,
        groupjoin(
            items2,
            x => x.id,
            y => y.id,
            (item1, items2) => ({ name: item1.name, items: items2.map(x => x.value).join() })
        )
    )];

    for (const res of [res1, res2]) {
        assert.deepEqual(res, [
            { name: 'one', items: 'ONE,ONE!' },
            { name: 'two', items: '' },
            { name: 'three!', items: 'THREE' },
            { name: 'three!!', items: 'THREE' }
        ]);
    }

});

export const samples = [
    () => groupjoin([1, 3, 2, 1], ['a', 'b', 'cc'], x => x, y => y.length, (x, ys) => x + ':' + ys),
];

export const linq = "GroupJoin";