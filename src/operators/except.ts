import { Func, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

function _except<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: Func<T, any>) {
    return wrapInIterable(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = item => item;
        }
        var set = new Set<T>();
        var set2 = new Set<T>();
        var key;
        for (var s of source2) {
            set2.add(keySelector(s));
        }
        for (var item of source) {
            key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                if (!set2.has(key)) {
                    yield item;
                }
            }
        }
    });
}

export function except<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: Func<T, any>): Iterable<T>;
export function except<T>(source2: Iterable<T>, keySelector?: Func<T, any>): Operator<T, T>;
export function except() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _except);
}
