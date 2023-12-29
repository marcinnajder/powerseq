import { keySelector, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

function _union<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>) {
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
        for (var item of source2) {
            key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
    });
}

export function union<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>): Iterable<T>;
export function union<T>(source2: Iterable<T>, keySelector?: keySelector<T, any>): Operator<T, T>;
export function union() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _union);
}
