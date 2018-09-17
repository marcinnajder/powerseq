import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { EIterable, Operator } from "../common/types";

function _expand<T>(source: Iterable<T>, selector: (item: T, index?: number) => Iterable<T> | undefined) {
    return wrapInIterable(function* () {
        var head: Node<T> = { iter: source };
        var last = head;
        var newIterable: Iterable<T>;

        while (true) {
            var index = 0;
            for (var item of head.iter) {
                yield item;
                newIterable = selector(item, index++);
                if (typeof newIterable !== "undefined") {
                    last = last.next = { iter: newIterable };
                }
            }
            if (typeof head.next === "undefined") {
                return;
            }
            head = head.next;
        }
    });
}

export function expand<T>(source: Iterable<T>, selector: (item: T, index?: number) => Iterable<T> | undefined): Iterable<T>;
export function expand<T>(selector: (item: T, index?: number) => Iterable<T> | undefined): Operator<T, T>;
export function expand() {
    return wrapInThunk(arguments, _expand);
}


declare module '../enumerable_' {
    interface Enumerable<T> {
        expand(selector: (item: T) => EIterable<T>): Enumerable<T>;
    }
}
Enumerable.prototype.expand = function <T>(this: Enumerable<T>, selector: (item: T) => EIterable<T>): Enumerable<T> {
    return new Enumerable(_expand(this, selector));
};

interface Node<T> {
    iter: Iterable<T>;
    next?: Node<T>;
}
