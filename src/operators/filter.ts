import { Operator, Predicate } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _filter<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T> {
    return wrapInIterable(function* () {
        var index = 0;
        for (var item of source) {
            if (predicate(item, index++)) {
                yield item;
            }
        }
    });
}

export function filter<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T>;
export function filter<T>(predicate: Predicate<T>): Operator<T, T>;
export function filter() {
    return wrapInThunk(arguments, _filter);
}
