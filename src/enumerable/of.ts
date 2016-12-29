import { Enumerable } from "../enumerable";
import { wrap } from "../common/utils";

export function of<T>(...args: T[]) {
    return wrap(function* () {
        for (var item of args) {
            yield item;
        }
    });
}
declare module '../enumerable' {
    namespace Enumerable {
        export function of<T>(...args: T[]): Enumerable<T>;
    }
}
Enumerable.of = function <T>(...args: T[]): Enumerable<T> {
    return new Enumerable<T>(of<T>(...args));
}