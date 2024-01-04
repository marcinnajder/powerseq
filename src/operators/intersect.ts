import { Func, Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInIterable, wrapInThunkIfOnlyFirstArgumentIsIterable, isIterable } from "../common/wrap";

function _intersect<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: Func<T, any>) {
    return wrapInIterable(function* () {
        const kSelector = keySelector ?? (identity as any);
        const set = new Set<any>();
        const resultSet = new Set<any>();

        for (const s of source) {
            set.add(kSelector(s));
        }

        for (const item of source2) {
            const key = kSelector(item);
            if (set.has(key) && !resultSet.has(key)) {
                resultSet.add(key);
                yield item;
            }
        }
    });
}

export function intersect<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: Func<T, any>): Iterable<T>;
export function intersect<T>(source2: Iterable<T>, keySelector?: Func<T, any>): Operator<T, T>;
export function intersect() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _intersect);
}
