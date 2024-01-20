import { Func, Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _distinct<T, K = T>(source: Iterable<T>, keySelector?: Func<T, K>) {
    return wrapInIterable(function* () {
        const kSelector = keySelector ?? (identity as any);
        const set = new Set<K>();
        for (const item of source) {
            const key = kSelector(item);
            if (!set.has(key)) {
                set.add(key);
                yield key;
            }
        }
    });
}

export function distinct<T>(source: Iterable<T>): Iterable<T>;
export function distinct<T, K>(source: Iterable<T>, keySelector: Func<T, K>): Iterable<K>;
export function distinct<T>(): Operator<T, T>;
export function distinct<T, K>(keySelector: Func<T, K>): Operator<T, K>;
export function distinct() {
    return wrapInThunk(arguments, _distinct);
}