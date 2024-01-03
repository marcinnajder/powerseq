import { wrapInIterable, wrapInThunkAlways } from "../common/wrap";
import { Operator } from "../common/types";

export function concat<T>(...args: Iterable<T>[]): Iterable<T> {
    return wrapInIterable(function* () {
        for (var arg of args) {
            yield* arg;
        }
    });
}

export function concatp<T>(...args: Iterable<T>[]): Operator<T, T> {
    return wrapInThunkAlways(arguments, concat);
}