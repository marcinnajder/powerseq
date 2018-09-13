import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function reverse<T>(source: Iterable<T>) {
    return wrapInIterable(function* () {
        yield* Array.from(source).reverse();
    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        reverse(): Enumerable<T>;
    }
}
Enumerable.prototype.reverse = function <T>(this: Enumerable<T>): Enumerable<T> {
    return new Enumerable<T>(reverse<T>(this));
};