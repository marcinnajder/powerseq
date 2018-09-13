import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function take<T>(source: Iterable<T>, count: number) {
    return wrapInIterable(function* () {
        var countInstance = count;
        if (countInstance > 0) {
            for (var item of source) {
                yield item;
                if (--countInstance === 0) break;
            }
        }
    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        take(count: number): Enumerable<T>;
    }
}
Enumerable.prototype.take = function <T>(this: Enumerable<T>, count: number) {
    return new Enumerable<T>(take<T>(this, count));
};