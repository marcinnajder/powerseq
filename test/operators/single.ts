import * as assert from "assert";
import { single } from "../../src/index";

it('single', function () {
    assert.equal(single([1, 3, 4, 6, 1], x => x > 5), 6);
    assert.equal(single([]), undefined);
    assert.equal(single([1, 2, 3, 4], x => x < 0), undefined);
    assert.equal(single([1, 2, 3, 4], x => x < 0, -1), -1);

    assert.equal(single()([]), undefined);
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