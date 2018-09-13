import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function throww<T>(error) {
    return wrapInIterable<T>(function* () {
        throw error;
    });
}
declare module '../enumerable_' {
    namespace Enumerable {
        export function throww<T>(error): Enumerable<T>;
    }
}
Enumerable.throww = function <T>(error): Enumerable<T> {
    return new Enumerable<T>(throww<T>(error));
}