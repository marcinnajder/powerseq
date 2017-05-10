import { AsyncEnumerable } from "../src/async/enumerable";
import wrap from "../src/async/common/wrap";
import "../src/async/operators/map";
import "../src/async/operators/filter";

test();

async function test() {

    var items = rangeAsync(1, 10, 1000);

    var q = new AsyncEnumerable(items)
        .filter(x => x % 2 == 0)
        .map(x => x * 10);

    for await (var item of q) {
        console.log(item);
    }
    for await (var item of q) {
        console.log(item);
    }
}


function rangeAsync(start: number, count: number, ms: number) {
    return wrap(async function* () {
        let end = start + count;
        for (var i = start; i < end; i++) {
            await delay(ms);
            yield i;
        }
    });
}

function delay(ms: number) {
    return new Promise<void>((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, ms)
    });
}
