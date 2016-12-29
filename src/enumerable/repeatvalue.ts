import { Enumerable } from "../enumerable";
import { wrap } from "../common/utils";

export function repeatvalue<T>(value: T, count?: number) {
    return wrap(function* () {
        if (typeof count === "undefined") {
            while (true) {
                yield value;
            }
        }
        else {
            for (var i = 0; i < count; i++) {
                yield value;
            }
        }
    });
}
declare module '../enumerable' {
    namespace Enumerable {
        export function repeatvalue<T>(value: T, count?: number): Enumerable<T>;
    }
}
Enumerable.repeatvalue = function <T>(value: T, count?: number): Enumerable<T> {
    return new Enumerable<T>(repeatvalue(value, count));
}