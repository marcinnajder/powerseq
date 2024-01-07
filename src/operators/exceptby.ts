import { Func, Operator } from "../common/types";
import { wrapInIterable, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

export function _exceptby<T>(source: Iterable<T>, source2: Iterable<T>, keySelector: Func<T, any>) {
    return wrapInIterable(function* () {
        const set = new Set<T>();
        const set2 = new Set<T>();

        for (const s of source2) {
            set2.add(keySelector(s));
        }

        for (const item of source) {
            const key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                if (!set2.has(key)) {
                    yield item;
                }
            }
        }
    });
}

export function exceptby<T>(source: Iterable<T>, source2: Iterable<T>, keySelector: Func<T, any>): Iterable<T>;
export function exceptby<T>(source2: Iterable<T>, keySelector: Func<T, any>): Operator<T, T>;
export function exceptby() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _exceptby);
}
