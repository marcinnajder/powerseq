import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function empty<T>() {
    return wrapInIterable<T>(function* () {
    });
}
declare module '../enumerable_' {
    namespace Enumerable {
        export function empty<T>(): Enumerable<T>;
    }
}
Enumerable.empty = function <T>(): Enumerable<T> {
    return new Enumerable<T>(empty<T>());
}