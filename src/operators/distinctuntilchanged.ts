import { Func, Operator } from "../common/types";
import { identity } from "../common/utils";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _distinctuntilchanged<T>(source: Iterable<T>, keySelector?: Func<T, any>) {
    return wrapInIterable(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = identity;
        }

        const iterator = source[Symbol.iterator]();

        let value = iterator.next();
        if (value.done) {
            return;
        }

        let lastKey = keySelector(value.value);
        yield value.value;

        while (true) {
            value = iterator.next();
            if (value.done) return;

            const key = keySelector(value.value);
            if (lastKey !== key) {
                lastKey = key;
                yield value.value;
            }
        }
    });
}

export function distinctuntilchanged<T>(source: Iterable<T>, keySelector?: Func<T, any>): Iterable<T>;
export function distinctuntilchanged<T>(keySelector?: Func<T, any>): Operator<T, T>;
export function distinctuntilchanged() {
    return wrapInThunk(arguments, _distinctuntilchanged);
}