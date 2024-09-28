import * as assert from "assert";
import { find, pipe } from "../../src/index";

it('find', function () {
    assert.deepEqual(find([1, 2]), 1);
    assert.deepEqual(find([]), undefined);
    assert.deepEqual(find([1, 2, 3, 4], x => x > 2), 3);
    assert.deepEqual(find([1, 2, 3, 4], (x, index) => index > 2 && x > 2), 4);
    assert.deepEqual(find([1, 2, 3, 4], x => x > 4), undefined);
    assert.deepEqual(find([1, 2, 3, 4], x => x > 4, 100), 100);

    assert.deepEqual(find((x: number) => x > 2)([1, 2, 3, 4]), 3);

    const stringsOrNumbers = ["1", 2, "3", 4];
    const string1 = find(stringsOrNumbers, x => typeof x === "string");
    assert.deepEqual(string1, "1");

    const string2 = pipe(stringsOrNumbers, find(x => typeof x === "string"));
    assert.deepEqual(string2, "1");

    const string3 = find(stringsOrNumbers, x => typeof x === "string" && x === "10", "11");
    assert.deepEqual(string3, "11");

    const string4 = pipe(stringsOrNumbers, find(x => typeof x === "string" && x === "10", "11"));
    assert.deepEqual(string4, "11");
});

export const samples = [
    () => find([1, 2, 2, 3, 4]),
    () => find([1, 2, 2, 3, 4], x => x > 2),
    () => find([1, 2, 2, 3, 4], x => x > 4),
    () => find([1, 2, 2, 3, 4], x => x > 4, 100),
    () => find([1, 2, 2, 3, 4], (x, index) => x > 1 && index > 2)
];

export const jsarray = "find";
export const linq = ["First", "FirstOrDefault"];
export const lodash = ["first", "head", "find"];
export const rxjs = ["find", "first"];
export const fsharp = ["find~", "tryFind", "head"];
export const kotlin = ["find", "first~"];
export const clojure = "first~";
export const java = "findFirst~";