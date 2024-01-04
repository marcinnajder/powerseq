import { Func, Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInIterable, wrapInThunk, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

function _except<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: Func<T, any>) {
    return wrapInIterable(function* () {
        const kSelector = keySelector ?? (identity as any);
        const set = new Set<T>();
        const set2 = new Set<T>();

        for (const s of source2) {
            set2.add(kSelector(s));
        }

        for (const item of source) {
            const key = kSelector(item);
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
