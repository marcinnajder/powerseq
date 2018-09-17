import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _doo<T>(source: Iterable<T>, action: (item: T, index: number) => void) {
    return wrapInIterable(function* () {
        var index = 0;
        for (var item of source) {
            action(item, index++);
            yield item;
        }
    });
}

export function doo<T>(source: Iterable<T>, action: (item: T, index: number) => void): Iterable<T>;
export function doo<T>(action: (item: T, index: number) => void): Operator<T, T>;
export function doo() {
    return wrapInThunk(arguments, _doo);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        doo(action: (item: T, index: number) => void): Enumerable<T>;
    }
}
Enumerable.prototype.doo = function <T>(this: Enumerable<T>, action: (item: T, index: number) => void): Enumerable<T> {
    return new Enumerable(_doo(this, action));
};