import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function throww<T>(error) {
    return wrap<T>(function* () {
        throw error;
    });
}
declare module '../enumerable' {
    namespace Enumerable {
        export function throww<T>(error): Enumerable<T>;
    }
}
Enumerable.throww = function <T>(error): Enumerable<T> {
    return new Enumerable<T>(throww<T>(error));
}