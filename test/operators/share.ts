import * as assert from "assert";
import { range, pipe, map, zip, share } from "../../src/index";

it('share', function () {
    // const shared = share(range(1, 6));

    // assert.deepEqual([...take(shared, 2)], [1, 2]);
    // assert.deepEqual([...take(shared, 2)], [3, 4]);

    const items = pipe(range(0, 2), map(i => ({ i })), share());
    assert.deepEqual([...zip(items, items, (x1, x2) => x1 === x2)], [false],);
});

export const samples = [
    () => pipe(range(0, 4), map(i => ({ i })), share(), xs => zip(xs, xs, (x1, x2) => [x1.i, x2.i, x1 === x2]))
];

export const rxjs = "share";
