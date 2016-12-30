import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function* ignoreelements<T>(source: Iterable<T>): Iterable<T> {
    return wrap(function* () {
        for (var item of source) {
        }
    });
}
declare module '../enumerable' {
    interface Enumerable<T> {
        ignoreelements(): Enumerable<T>;
    }
}
Enumerable.prototype.ignoreelements = function <T>(this: Enumerable<T>): Enumerable<T> {
    return new Enumerable(ignoreelements<T>(this));
};