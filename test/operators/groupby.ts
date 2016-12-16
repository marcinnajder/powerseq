import * as assert from "assert";
import { Enumerable, map} from "../../src/index";

it('groupby', function () {
    assert.deepEqual(Enumerable.from(["a", "b", "cc", "ddd"])
        .groupby(x => x.length).map(x => x.key + ":" + Array.from(x).join(",")).toarray(), ["1:a,b", "2:cc", "3:ddd"]);
    assert.deepEqual(Enumerable.from(["a", "b", "cc", "ddd"])
        .groupby(x => x.length, (key, items) => key + ":" + Array.from(items).join(",")).toarray(), ["1:a,b", "2:cc", "3:ddd"]);
});

export const linq = "GroupBy";