import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunkAlways } from "../common/wrap";
import { Operator } from "../common/types";

export function concat<T>(...args: Iterable<T>[]): Iterable<T> {
    return wrapInIterable(function* () {
        for (var arg of args) {
            yield* arg;
        }
    });
}
export function concatp<T>(...args: Iterable<T>[]): Operator<T, T> {
    return wrapInThunkAlways(arguments, concat);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        concat(...args: Iterable<T>[]): Enumerable<T>;
    }
}
Enumerable.prototype.concat = function <T>(this: Enumerable<T>, ...args: Iterable<T>[]): Enumerable<T> {
    return new Enumerable(concat(this, ...args));
};