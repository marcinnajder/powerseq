import { Operator } from "../common/types";
import { wrapInIterable, wrapInThunkAlways } from "../common/wrap";

export function defaultifempty<T>(source: Iterable<T>, defaultValue?: T): Iterable<T> {
    return wrapInIterable(function* () {
        var hasValue = false;
        for (var item of source) {
            hasValue = true;
            yield item;
        }
        if (!hasValue) {
            yield defaultValue!;
        }
    });
}

export function defaultifemptyp<T>(defaultValue?: T): Operator<T, T> {
    return wrapInThunkAlways(arguments, defaultifempty);
}