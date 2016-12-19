import * as assert from "assert";
import { Enumerable, maxby } from "../../src/index";

it('maxby', function () {
    var items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }];
    assert.deepEqual(maxby(items, x => x.id), { id: 3 });
    assert.deepEqual(Enumerable.from(items).maxby(x => x.id), { id: 3 });
    assert.deepEqual(Enumerable.from([]).maxby(x => x), undefined);
});