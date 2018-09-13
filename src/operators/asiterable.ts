import { Enumerable } from "../enumerable_";

export function asiterable<T>(source: Iterable<T>): Iterable<T> {
    return source;
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        asiterable(): Iterable<T>;
    }
}
Enumerable.prototype.asiterable = function <T>(this: Enumerable<T>): Iterable<T> {
    return asiterable<T>(this);
};