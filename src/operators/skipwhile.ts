import { Predicate, Operator } from "../common/types";
import { wrapInIterable, wrapInThunk } from "../common/wrap";

function _skipwhile<T>(source: Iterable<T>, predicate: Predicate<T>) {
    return wrapInIterable(function* () {
        const iterator = source[Symbol.iterator]();
        let index = 0;

        while (true) {
            const value = iterator.next();
            if (value.done) return;
            if (predicate(value.value, index++)) continue;
            yield value.value;
            break;
        }

        while (true) {
            const value = iterator.next();
            if (value.done) return;
            yield value.value;
        }
    });
}

export function skipwhile<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T>;
export function skipwhile<T>(predicate: Predicate<T>): Operator<T, T>;
export function skipwhile() {
    return wrapInThunk(arguments, _skipwhile);
}
