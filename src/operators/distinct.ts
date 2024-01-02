import { Selector, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _distinct<T>(source: Iterable<T>, keySelector?: Selector<T, any>) {
    return wrapInIterable(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = item => item;
        }
        var set = new Set<any>();
        var key;
        for (var item of source) {
            key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
    });
}

export function distinct<T>(source: Iterable<T>, keySelector?: Selector<T, any>): Iterable<T>;
export function distinct<T>(keySelector?: Selector<T, any>): Operator<T, T>;
export function distinct() {
    return wrapInThunk(arguments, _distinct);
}