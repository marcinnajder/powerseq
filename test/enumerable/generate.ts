import * as assert from "assert";
import { Enumerable, generate } from "../../src/enumerable";

it('generate', function () {
    assert.deepEqual(Array.from(generate(0, x => x < 4, x => x + 1, x => 'a'.repeat(x))), ["", "a", "aa", "aaa"]);
    assert.deepEqual(Enumerable.generate(0, x => x < 4, x => x + 1, x => 'a'.repeat(x)).toarray(), ["", "a", "aa", "aaa"]);
});

export const samples = [
    () => generate(0, x => x < 4, x => x + 1, x => 'a'.repeat(x))
];