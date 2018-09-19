import { Enumerable } from "../enumerable_";
import { predicate, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _takewhile<T>(source: Iterable<T>, predicate: predicate<T>) {
    return wrapInIterable(function* () {
        let index = 0;
        for (var item of source) {
            if (!predicate(item, index++)) {
                break;
            }
            yield item;
        }
    });
}

export function takewhile<T>(source: Iterable<T>, predicate: predicate<T>): Iterable<T>;
export function takewhile<T>(predicate: predicate<T>): Operator<T, T>;
export function takewhile() {
    return wrapInThunk(arguments, _takewhile);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        takewhile(predicate: predicate<T>): Enumerable<T>;
    }
}
Enumerable.prototype.takewhile = function <T>(this: Enumerable<T>, predicate: predicate<T>) {
    return new Enumerable<T>(_takewhile(this, predicate));
};