import * as assert from "assert";
import { generate } from "../../src/index";

it('generate', function () {
    assert.deepEqual([...generate(0, x => x < 4, x => x + 1, x => 'a'.repeat(x))], ["", "a", "aa", "aaa"]);
    assert.deepEqual([...generate(0, x => x < 4, x => x + 1, x => 'a'.repeat(x))], ["", "a", "aa", "aaa"]);
});

export const samples = [
    () => generate(0, x => x < 4, x => x + 1, x => 'a'.repeat(x))
];

export const kotlin = "generate";
export const fsharp = ["init", "initInfinite"];
export const clojure = ["iterate", "repeatedly"];
export const java = "iterate";