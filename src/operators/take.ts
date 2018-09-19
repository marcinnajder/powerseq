import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _take<T>(source: Iterable<T>, count: number) {
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

export function take<T>(source: Iterable<T>, count: number): Iterable<T>;
export function take<T>(count: number): Operator<T, T>;
export function take() {
    return wrapInThunk(arguments, _take);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        take(count: number): Enumerable<T>;
    }
}
Enumerable.prototype.take = function <T>(this: Enumerable<T>, count: number) {
    return new Enumerable<T>(_take<T>(this, count));
};