import { Func, Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _distinctby<T>(source: Iterable<T>, keySelector: Func<T, any>) {
    return wrapInIterable(function* () {
        const set = new Set<any>();
        for (var item of source) {
            const key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                yield item;
            }
        }
    });
}

export function distinctby<T>(source: Iterable<T>, keySelector: Func<T, any>): Iterable<T>;
export function distinctby<T>(keySelector: Func<T, any>): Operator<T, T>;
export function distinctby() {
    return wrapInThunk(arguments, _distinctby);
}