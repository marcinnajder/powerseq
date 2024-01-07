import { Func, Operator } from "../common/types";
import { wrapInIterable, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

export function _unionby<T>(source: Iterable<T>, source2: Iterable<T>, keySelector: Func<T, any>) {
    return wrapInIterable(function* () {
        const set = new Set<any>();
        for (const item of source) {
            const key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
        for (const item of source2) {
            const key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
    });
}

export function unionby<T>(source: Iterable<T>, source2: Iterable<T>, keySelector: Func<T, any>): Iterable<T>;
export function unionby<T>(source2: Iterable<T>, keySelector: Func<T, any>): Operator<T, T>;
export function unionby() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _unionby);
}
