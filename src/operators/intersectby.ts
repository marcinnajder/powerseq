import { Func, Operator } from "../common/types";
import { wrapInIterable, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

export function _intersectby<T>(source: Iterable<T>, source2: Iterable<T>, keySelector: Func<T, any>) {
    return wrapInIterable(function* () {
        const set = new Set<any>();
        const resultSet = new Set<any>();

        for (const s of source) {
            set.add(keySelector(s));
        }

        for (const item of source2) {
            const key = keySelector(item);
            if (set.has(key) && !resultSet.has(key)) {
                resultSet.add(key);
                yield item;
            }
        }
    });
}

export function intersectby<T>(source: Iterable<T>, source2: Iterable<T>, keySelector: Func<T, any>): Iterable<T>;
export function intersectby<T>(source2: Iterable<T>, keySelector: Func<T, any>): Operator<T, T>;
export function intersectby() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _intersectby);
}
