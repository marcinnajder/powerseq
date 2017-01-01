import * as assert from "assert";
import { Enumerable, toarray } from "../../src/index";
import { return123Iterator} from "../common";

it('toarray', function () {
    assert.deepEqual(toarray(return123Iterator()), [1, 2, 3]);
    assert.deepEqual(Enumerable.from([]).toarray(), []);
    assert.deepEqual(Enumerable.from([1, 2, 3]).toarray(), [1, 2, 3]);
});

export const linq = "ToArray";

export const samples = [
    () => toarray([1, 2, 2])    
];