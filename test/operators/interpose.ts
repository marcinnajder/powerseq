import * as assert from "assert";
import { interpose, pipe } from "../../src/index";

it('interpose', function () {
    assert.deepEqual([...interpose([], 0)], []);
    assert.deepEqual([...interpose([1], 0)], [1]);
    assert.deepEqual([...interpose([1, 2], 0)], [1, 0, 2]);
    assert.deepEqual([...interpose([1, 2, 3], 0)], [1, 0, 2, 0, 3]);

    assert.deepEqual([...pipe([1, 2, 3], interpose(0))], [1, 0, 2, 0, 3]);
});

export const samples = [
    () => interpose([1, 2, 3], 0),
    () => interpose([1], 0),
    () => interpose([], 0),
];

export const clojure = "interpose";