import * as assert from "assert";
import { Enumerable, zip, asiterable} from "../../src/index";

it('asiterable', function () {
    // type inferrence inside lambda expression is not workng without calling "asiterable"" method
    assert.deepEqual(Array.from(zip(["a", "b"], Enumerable.range(1, Number.MAX_VALUE).asiterable(), (s, n) => s + n)), ["a1", "b2"]);
});

export const samples = [
    () => asiterable([1, 2] /**changes seq type to help TypeScript*/ ),
];