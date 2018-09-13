import { Enumerable } from "../enumerable_";
import { wrapInIterable } from "../common/wrap";

export function of<T>(...args: T[]) {
    return wrapInIterable(function* () {
        for (var item of args) {
            yield item;
        }
    });
}
declare module '../enumerable_' {
    namespace Enumerable {
        export function of<T>(...args: T[]): Enumerable<T>;
    }
}
Enumerable.of = function <T>(...args: T[]): Enumerable<T> {
    return new Enumerable<T>(of<T>(...args));
}