import { Operator } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _repeat<T>(source: Iterable<T>, count?: number) {
    return wrapInIterable(function* () {
        if (typeof count === "undefined") {
            while (true) {
                yield* source;
            }
        } else {
            for (var i = 0; i < count; i++) {
                yield* source;
            }
        }
    });
}

export function repeat<T>(source: Iterable<T>, count?: number): Iterable<T>;
export function repeat<T>(count?: number): Operator<T, T>;
export function repeat() {
    return wrapInThunk(arguments, _repeat);
}


declare module '../enumerable_' {
    interface Enumerable<T> {
        repeat(count?: number): Enumerable<T>;
    }
}
Enumerable.prototype.repeat = function <T>(this: Enumerable<T>, count?: number) {
    return new Enumerable<T>(_repeat<T>(this, count));
};

export const rxjs = "repeat";

