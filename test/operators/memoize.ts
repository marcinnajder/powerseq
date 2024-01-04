import * as assert from "assert";
import { memoize, range, pipe, map, zip, toarray } from "../../src/index";

it('memoize', function () {
    let done = 0;
    function* return123() {
        yield 1;
        yield 2;
        yield 3;
        done++;
    }

    const memoized = memoize(return123());

    assert.deepEqual([...memoized], [1, 2, 3]);
    assert.equal(done, 1);

    assert.deepEqual([...memoized], [1, 2, 3]);
    assert.equal(done, 1);

    const items = pipe(range(0, 2), map(i => ({ i })), memoize());
    assert.deepEqual([...zip(items, items, (x1, x2) => x1 === x2)], [true, true],);
});

export const samples = [
    () => pipe(range(0, 4), map(i => ({ i })), memoize(), xs => zip(xs, xs, (x1, x2) => [x1.i, x2.i, x1 === x2]))
];

export const fsharp = "cache";

