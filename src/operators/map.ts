import { Enumerable } from "../enumerable";
import { selector } from "../common/types";
import wrap from "../common/wrap";

export function map<T, TResult>(source: Iterable<T>, projection: selector<T, TResult>) {
    return wrap(function* () {
        var index = 0;
        for (var item of source) {
            yield projection(item, index++);
        }
    });
}
declare module '../enumerable' {
    interface Enumerable<T> {
        map<TResult>(projection: selector<T, TResult>): Enumerable<TResult>;
    }
}
Enumerable.prototype.map = function <T, TResult>(this: Enumerable<T>, projection: selector<T, TResult>) {
    return new Enumerable<TResult>(map(this, projection));
};