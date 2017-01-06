import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";
import { EIterable } from "../common/types";

export function expand<T>(source: Iterable<T>, selector: (item: T, index?: number) => Iterable<T> | undefined) {
    return wrap(function* () {
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
declare module '../enumerable' {
    interface Enumerable<T> {
        expand(selector: (item: T) => EIterable<T>): Enumerable<T>;
    }
}
Enumerable.prototype.expand = function <T>(this: Enumerable<T>, selector: (item: T) => EIterable<T>): Enumerable<T> {
    return new Enumerable(expand(this, selector));
};

interface Node<T> {
    iter: Iterable<T>;
    next?: Node<T>;
}
