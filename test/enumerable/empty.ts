import * as assert from "assert";
import { Enumerable, empty } from "../../src/index";

it('empty', function () {
    var result = Enumerable.empty<number>();
    assert.deepEqual(result.toarray(), []);
});

export const samples = [
    () => empty<number>()
];

export const rxjs = "empty";
export const fsharp = "empty";