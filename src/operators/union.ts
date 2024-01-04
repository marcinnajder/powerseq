import { Func, Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInIterable, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

function _union<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: Func<T, any>) {
    return wrapInIterable(function* () {
        const kSelector = keySelector ?? (identity as any);
        const set = new Set<any>();

        for (const item of source) {
            const key = kSelector(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
        for (const item of source2) {
            const key = kSelector(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
    });
}

export function union<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: Func<T, any>): Iterable<T>;
export function union<T>(source2: Iterable<T>, keySelector?: Func<T, any>): Operator<T, T>;
export function union() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _union);
}
