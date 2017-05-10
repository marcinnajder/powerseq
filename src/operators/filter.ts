import { predicate } from "../common/types";
import { /**Async**/Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function filter<T>(source: /**Async**/Iterable<T>, predicate: predicate<T>) {
    return wrap(/**async**/function* () {
        var index = 0;
        for /**await**/(var item of source) {
            if (predicate(item, index++)) {
                yield item;
            }
        }
    });
}
declare module '../enumerable' {
    interface /**Async**/Enumerable<T> {
        filter(predicate: predicate<T>): /**Async**/Enumerable<T>;
    }
}
/**Async**/Enumerable.prototype.filter = function <T>(this: /**Async**/Enumerable<T>, predicate: predicate<T>) {
    return new /**Async**/Enumerable<T>(filter(this, predicate));
};

