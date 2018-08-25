import { predicate } from "../common/types";
import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function filter<T>(source: Iterable<T>, predicate: predicate<T>) {
    return wrap(function* () {
        var index = 0;
        for (var item of source) {
            if (predicate(item, index++)) {
                yield item;
            }
        }
    });
}
declare module '../enumerable' {
    interface Enumerable<T> {
        filter(predicate: predicate<T>): Enumerable<T>;
    }
}
Enumerable.prototype.filter = function <T>(this: Enumerable<T>, predicate: predicate<T>) {
    return new Enumerable<T>(filter(this, predicate));
};

