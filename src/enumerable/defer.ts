import { Enumerable } from "../enumerable_";
import { EIterable } from "../common/types";
import { wrapInIterable } from "../common/wrap";

export function defer<T>(factory: () => Iterable<T>) {
    return wrapInIterable(function* () {
        yield* factory();
    });
}
declare module '../enumerable_' {
    namespace Enumerable {
        function defer<T>(factory: () => EIterable<T>): Enumerable<T>;
    }
}
Enumerable.defer = function <T>(factory: () => EIterable<T>): Enumerable<T> {
    return new Enumerable<T>(defer<T>(factory));
}