import * as assert from "assert";
import { every } from "../../src/index";

it('every', function () {
    assert.deepEqual(every([1, 2], x => x > 0), true);
    assert.deepEqual(every([1, 2], x => x > 1), false);
    assert.deepEqual(every((x: number) => x > 0)([1, 2]), true);

    const stringsOrNumbers = ["1", 2, "3", 4] as Iterable<string | number>; // casting from Array to Iterable is ...

    if (every(stringsOrNumbers, x => typeof x === "string")) {
        // ...is necessary to correctly narrow type here
        console.log(stringsOrNumbers);
        assert.fail("Not every item is of type 'string'");
    }

    if (every(x => typeof x === "string")(stringsOrNumbers)) {
        console.log(stringsOrNumbers);
        assert.fail("Not every item is of type 'string'");
    }
});


export const samples = [
    () => every([1, 2, 12, 15], x => x > 0),
    () => every([1, 2, 12, 15], x => x < 10),
    () => every([0, 1, 3, 3], (x, index) => x === index),
];

export const linq = "All";
export const jsarray = "every";
export const lodash = "every";
export const rxjs = "every";
export const fsharp = "forall";
export const kotlin = "all";
export const clojure = "every?";
export const java = "allMatch";