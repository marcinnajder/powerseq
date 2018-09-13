import { Enumerable } from "../enumerable_";

export function foreach<T>(source: Iterable<T>, action?: (item: T, index: number) => void) {
    if (typeof action === "undefined") {
        for (var item of source) {
        }
    }
    else {
        var index = 0;
        for (var item of source) {
            action(item, index++);
        }
    }
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        foreach(action?: (item: T, index: number) => void): void;
    }
}
Enumerable.prototype.foreach = function <T>(this: Enumerable<T>, action?: (item: T, index: number) => void) {
    foreach(this, action);
};