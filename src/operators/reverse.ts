import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function reverse<T>(source: Iterable<T>) {
    return wrap(function* () {
        yield* Array.from(source).reverse();
    });
}
declare module '../enumerable' {
    interface Enumerable<T> {
        reverse(): Enumerable<T>;
    }
}
Enumerable.prototype.reverse = function <T>(this: Enumerable<T>): Enumerable<T> {
    return new Enumerable<T>(reverse<T>(this));
};