import { Enumerable } from "../enumerable";
import { wrap } from "../common/utils";

export function empty<T>() {
    return wrap<T>(function* () {
    });
}
declare module '../enumerable' {
    namespace Enumerable {
        export function empty<T>(): Enumerable<T>;
    }
}
Enumerable.empty = function <T>(): Enumerable<T> {
    return new Enumerable<T>(empty<T>());
}