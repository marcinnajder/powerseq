import { wrapInIterable, wrapInThunk } from "../common/wrap";
import { Operator } from "../common/types";

function _expand<T>(source: Iterable<T>, selector: (item: T, index?: number) => Iterable<T> | undefined) {
    return wrapInIterable(function* () {
        let head: Node<T> = { iter: source };
        let last = head;
        let newIterable: Iterable<T> | undefined;

        while (true) {
            let index = 0;
            for (const item of head.iter) {
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

interface Node<T> {
    iter: Iterable<T>;
    next?: Node<T>;
}
