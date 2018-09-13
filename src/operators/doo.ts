import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function doo<T>(source: Iterable<T>, action: (item: T, index: number) => void) {
    return wrapInIterable(function* () {
        var index = 0;
        for (var item of source) {
            action(item, index++);
            yield item;
        }
    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        doo(action: (item: T, index: number) => void): Enumerable<T>;
    }
}
Enumerable.prototype.doo = function <T>(this: Enumerable<T>, action: (item: T, index: number) => void): Enumerable<T> {
    return new Enumerable(doo(this, action));
};