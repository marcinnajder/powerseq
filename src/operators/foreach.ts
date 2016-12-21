import { Enumerable } from "../enumerable";

export function foreach<T>(source: Iterable<T>, action: (item: T, index: number) => void) {
    var index = 0;
    for (var item of source) {
        action(item, index++);
    }
}
declare module '../enumerable' {
    interface Enumerable<T> {
        foreach(action: (item: T, index: number) => void): void;
    }
}
Enumerable.prototype.foreach = function <T>(this: Enumerable<T>, action: (item: T, index: number) => void) {
    foreach(this, action);
};