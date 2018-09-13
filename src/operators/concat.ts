import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function concat<T>(...args: Iterable<T>[]) {
    return wrapInIterable(function* () {
        for (var arg of args) {
            yield* arg;
        }
    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        concat(...args: Iterable<T>[]): Enumerable<T>;
    }
}
Enumerable.prototype.concat = function <T>(this: Enumerable<T>, ...args: Iterable<T>[]): Enumerable<T> {
    return new Enumerable(concat(this, ...args));
};