import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function* ignoreelements<T>(source: Iterable<T>): Iterable<T> {
    return wrapInIterable(function* () {
        for (var item of source) {
        }
    });
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        ignoreelements(): Enumerable<T>;
    }
}
Enumerable.prototype.ignoreelements = function <T>(this: Enumerable<T>): Enumerable<T> {
    return new Enumerable(ignoreelements<T>(this));
};