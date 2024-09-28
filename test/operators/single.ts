import * as assert from "assert";
import { pipe, single } from "../../src/index";

it('single', function () {
    assert.equal(single([1, 3, 4, 6, 1], x => x > 5), 6);
    assert.equal(single([]), undefined);
    assert.equal(single([1, 2, 3, 4], x => x < 0), undefined);
    assert.equal(single([1, 2, 3, 4], x => x < 0, -1), -1);

    assert.equal(single()([]), undefined);

    const stringsOrNumbers = ["1", 2, "3", 4];
    const string1 = single(stringsOrNumbers, x => typeof x === "string");
    assert.deepEqual(string1, undefined);

    const string2 = pipe(stringsOrNumbers, single(x => typeof x === "string"));
    assert.deepEqual(string2, undefined);

    const string3 = single(stringsOrNumbers, x => typeof x === "string" && x === "3", "11");
    assert.deepEqual(string3, "3");

    const string4 = pipe(stringsOrNumbers, single(x => typeof x === "string" && x === "10", "11"));
    assert.deepEqual(string4, "11");
});

export const samples = [
    () => single([1]),
    () => single([]),
    //     () => single([], -1),
    () => single([1, 2, 3], x => x > 2),
    () => single([1, 2, 3], x => x > 10),
    () => single([1, 2, 3], x => x > 10, -1)
];

export const linq = ["Single", "SingleOrDefault"];
export const rxjs = "single";
export const fsharp = "exactlyOne";
export const kotlin = ["single", "singleOrNull"];