// file was generated
import { predicate } from "../common/types";
import { AsyncEnumerable } from "../enumerable";
import wrap from "../common/wrap";

export function filter<T>(source: AsyncIterable<T>, predicate: predicate<T>) {
    return wrap(async function* () {
        var index = 0;
        for await(var item of source) {
            if (predicate(item, index++)) {
                yield item;
            }
        }
    });
}
declare module '../enumerable' {
    interface AsyncEnumerable<T> {
        filter(predicate: predicate<T>): AsyncEnumerable<T>;
    }
}
AsyncEnumerable.prototype.filter = function <T>(this: AsyncEnumerable<T>, predicate: predicate<T>) {
    return new AsyncEnumerable<T>(filter(this, predicate));
};

