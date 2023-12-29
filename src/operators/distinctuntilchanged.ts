import { keySelector, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _distinctuntilchanged<T>(source: Iterable<T>, keySelector?: keySelector<T, any>) {
    return wrapInIterable(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = item => item;
        }

        var iterator = source[Symbol.iterator]();
        var value: IteratorResult<T>;
        var lastKey: T;
        var key;

        value = iterator.next();
        if (value.done) return;
        lastKey = keySelector(value.value);
        yield value.value;

        while (true) {
            value = iterator.next();
            if (value.done) return;

            key = keySelector(value.value);
            if (lastKey !== key) {
                lastKey = key;
                yield value.value;
            }
        }
    });
}

export function distinctuntilchanged<T>(source: Iterable<T>, keySelector?: keySelector<T, any>): Iterable<T>;
export function distinctuntilchanged<T>(keySelector?: keySelector<T, any>): Operator<T, T>;
export function distinctuntilchanged() {
    return wrapInThunk(arguments, _distinctuntilchanged);
}