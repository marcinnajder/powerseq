import { AsyncEnumerable } from "../enumerable";
import { selector } from "../common/types";
import wrap from "../common/wrap";

export function map<T, TResult>(source: AsyncIterable<T>, projection: selector<T, TResult>) {
    return wrap(async function* () {
        var index = 0;
        for await(var item of source) {
            yield projection(item, index++);
        }
    });
}
declare module '../enumerable' {
    interface AsyncEnumerable<T> {
        map<TResult>(projection: selector<T, TResult>): AsyncEnumerable<TResult>;
    }
}
AsyncEnumerable.prototype.map = function <T, TResult>(this: AsyncEnumerable<T>, projection: selector<T, TResult>) {
    return new AsyncEnumerable<TResult>(map(this, projection));
};