import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _repeat<T>(source: Iterable<T>, count?: number) {
    return wrapInIterable(function* () {
        if (typeof count === "undefined") {
            while (true) {
                yield* source;
            }
        } else {
            for (let i = 0; i < count; i++) {
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
