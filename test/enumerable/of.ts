import * as assert from "assert";
import { Enumerable, of } from "../../src/index";

it('of', function () {
    assert.deepEqual(Enumerable.of().toarray(), []);
    assert.deepEqual(Enumerable.of(1, 2, 3, 4).toarray(), [1, 2, 3, 4]);
    assert.deepEqual(Enumerable.of(1, 2, <any>"a", <any>"b").toarray(), [1, 2, "a", "b"]);
});

export const samples = [
    () => of<any>(1, 2, true, 'abc')
];

export const jsarray = "of";
export const rxjs = "of";