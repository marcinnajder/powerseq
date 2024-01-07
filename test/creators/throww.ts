import * as assert from "assert";
import { throww } from "../../src/index";

it('throww', function () {
    assert.throws(() => {
        [...throww<string>(new Error("exception ..."))];
    }, new Error("exception ..."));
});

export const samples = [
    () => throww(new Error("exception ..."))
];

export const rxjs = "throw";