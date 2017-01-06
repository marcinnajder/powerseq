import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function take<T>(source: Iterable<T>, count: number) {
    return wrap(function* () {
        var countInstance = count;
        if (countInstance > 0) {
            for (var item of source) {
                yield item;
                if (--countInstance === 0) break;
            }
        }
    });
}
declare module '../enumerable' {
    interface Enumerable<T> {
        take(count: number): Enumerable<T>;
    }
}
Enumerable.prototype.take = function <T>(this: Enumerable<T>, count: number) {
    return new Enumerable<T>(take<T>(this, count));
};