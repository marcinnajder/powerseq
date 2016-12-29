import { Enumerable } from "../enumerable";
import { EIterable } from "../common/types";
import { wrap } from "../common/utils";

export function defer<T>(factory: () => Iterable<T>) {
    return wrap(function* () {
        yield* factory();
    });
}
declare module '../enumerable' {
    namespace Enumerable {
        function defer<T>(factory: () => EIterable<T>): Enumerable<T>;
    }
}
Enumerable.defer = function <T>(factory: () => EIterable<T>): Enumerable<T> {
    return new Enumerable<T>(defer<T>(factory));
}